import { Injectable, Logger } from '@nestjs/common';
import { EHRMappingRepository } from 'src/infrastructure/repositories/ehr-mapping.repository';
import { GraphQLError } from 'graphql';

@Injectable()
export class ValidationService {
  private readonly logger = new Logger(ValidationService.name);

  constructor(private readonly ehrMappingRepository: EHRMappingRepository) {}

  async validateInputData(
    ehrSystem: string,
    inputData: Record<string, unknown>,
  ): Promise<void> {
    if (!ehrSystem || !inputData) {
      throw new GraphQLError('EHR system and input data are required.', {
        extensions: { code: 'BAD_REQUEST', statusCode: 400 },
      });
    }

    const mappings = await this.ehrMappingRepository.findByEHRSystem(ehrSystem);

    if (!mappings.length) {
      this.logger.warn(`No mappings found for EHR system: ${ehrSystem}`);
      throw new GraphQLError(`No mappings found for EHR system: ${ehrSystem}`, {
        extensions: { code: 'BAD_REQUEST', statusCode: 400 },
      });
    }

    const requiredFields = mappings.map((mapping) => mapping.sourceField);
    const missingFields = requiredFields.filter(
      (field) => !(field in inputData),
    );

    if (missingFields.length > 0) {
      this.logger.warn(
        `Validation failed: Missing fields: ${missingFields.join(', ')}`,
      );
      throw new GraphQLError(
        `Missing required fields for ${ehrSystem}: ${missingFields.join(', ')}`,
        {
          extensions: { code: 'BAD_REQUEST', missingFields, statusCode: 400 },
        },
      );
    }
  }
}
