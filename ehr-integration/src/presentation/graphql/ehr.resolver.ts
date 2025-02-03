import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EHRMappingService } from 'src/core/services/ehr-mapping.service';
import { EHRMappingRepository } from 'src/infrastructure/repositories/ehr-mapping.repository';
import { EHRMappingDTO } from 'src/core/dto/mapped-ehr.dto';
import { BadRequestException, UseGuards, Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { MapEHRDataUseCase } from 'src/application/use-cases/map-ehr-data.use-case';
import { EHRMappingFieldDTO } from 'src/core/dto/ehr-mapping-field-dto';

@Resolver()
export class EHRResolver {
  private readonly logger = new Logger(EHRResolver.name);

  constructor(
    private readonly ehrMappingService: EHRMappingService,
    private readonly ehrMappingRepository: EHRMappingRepository,
    private readonly mapEHRDataUseCase: MapEHRDataUseCase,
  ) {}

  @Query(() => [EHRMappingFieldDTO])
  async getMappings(@Args('ehrSystem') ehrSystem: string) {
    return this.ehrMappingRepository.findByEHRSystem(ehrSystem);
  }

  @Mutation(() => EHRMappingDTO, { nullable: true })
  @UseGuards(JwtAuthGuard)
  async mapEHRData(
    @Args('ehrSystem') ehrSystem: string,
    @Args('inputData', { type: () => String }) inputData: string,
  ): Promise<EHRMappingDTO> {
    if (!ehrSystem || !inputData) {
      throw new Error('ehrSystem and inputData are required');
    }

    try {
      const parsedInputData: Record<string, unknown> = JSON.parse(
        inputData,
      ) as Record<string, unknown>;
      const mappedFields = await this.mapEHRDataUseCase.execute(
        ehrSystem,
        parsedInputData,
      );

      if (!mappedFields) {
        throw new BadRequestException(
          `Mapping failed for EHR system: ${ehrSystem}`,
        );
      }

      return {
        ehrSystem,
        mappedFields: JSON.stringify(mappedFields),
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Error mapping data: ${errorMessage}`);
      throw new BadRequestException(`Error mapping data: ${errorMessage}`);
    }
  }
}
