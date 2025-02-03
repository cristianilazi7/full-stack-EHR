import { Injectable, Logger } from '@nestjs/common';
import { EHRMappingService } from 'src/core/services/ehr-mapping.service';
import { ValidationService } from 'src/core/services/validation.service';
import { EHRRepository } from 'src/infrastructure/repositories/ehr.repository';

@Injectable()
export class MapEHRDataUseCase {
  private readonly logger = new Logger(MapEHRDataUseCase.name);
  constructor(
    private readonly ehrMappingService: EHRMappingService,
    private readonly validationService: ValidationService,
    private readonly ehrRepository: EHRRepository,
  ) {}

  async execute<T>(
    ehrSystem: string,
    inputData: Record<string, T>,
  ): Promise<Record<string, T> | { error: string }> {
    await this.validationService.validateInputData(ehrSystem, inputData);
    const user = await this.ehrRepository.findUserByEmail(
      inputData.email as string,
    );
    if (!user) {
      this.logger.warn(
        `User not found: ${inputData.email as unknown as string}`,
      );
      return {
        error: `User with email ${inputData.email as unknown as string} not found in the system.`,
      };
    }

    try {
      const mappedData = await this.ehrMappingService.mapDataToEHR(
        ehrSystem,
        inputData,
      );

      await this.ehrRepository.saveTransaction(user.id, ehrSystem, mappedData);

      return mappedData;
    } catch (error: unknown) {
      this.logger.error(
        `Error mapping data: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      return { error: 'Error processing the request. Please try again later.' };
    }
  }
}
