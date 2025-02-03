import { Injectable } from '@nestjs/common';
import { EHRMapping } from 'src/infrastructure/entities/ehr-mapping.entity';
import { EHRMappingRepository } from 'src/infrastructure/repositories/ehr-mapping.repository';

@Injectable()
export class EHRMappingService {
  constructor(private readonly ehrMappingRepository: EHRMappingRepository) {}

  async mapDataToEHR<T>(
    ehrSystem: string,
    inputData: Record<string, T>,
  ): Promise<Record<string, T>> {
    const mappings = await this.ehrMappingRepository.findByEHRSystem(ehrSystem);

    if (!mappings.length) {
      throw new Error(`No mappings found for EHR system: ${ehrSystem}`);
    }

    return Object.keys(inputData).reduce(
      (mappedData, key) => {
        const mapping = mappings.find((m) => m.sourceField === key);
        if (mapping) {
          mappedData[mapping.targetField] = inputData[key];
        }
        return mappedData;
      },
      {} as Record<string, T>,
    );
  }

  async upsertEHRMappings<T>(
    ehrSystem: string,
    mappings: Record<string, T>,
  ): Promise<void> {
    // Delete existing mappings for the given EHR system (if any)
    await this.ehrMappingRepository.deleteByEHRSystem(ehrSystem);

    // Convert new mappings into database-compatible entities
    const newMappings: Partial<EHRMapping>[] = Object.entries(mappings).map(
      ([sourceField, targetField]) => ({
        ehrSystem,
        sourceField,
        targetField: targetField as string, // Ensure type safety
      }),
    );

    // Insert the new mappings
    await this.ehrMappingRepository.createMapping(newMappings);
  }

  async createMapping(mappings: Partial<EHRMapping>[]): Promise<EHRMapping[]> {
    return await this.ehrMappingRepository.createMapping(mappings);
  }
}
