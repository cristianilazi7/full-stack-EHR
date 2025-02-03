import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EHRMapping } from '../entities/ehr-mapping.entity';

@Injectable()
export class EHRMappingRepository {
  constructor(
    @InjectRepository(EHRMapping)
    private readonly ehrMappingRepo: Repository<EHRMapping>,
  ) {}

  async findAll(): Promise<EHRMapping[]> {
    return this.ehrMappingRepo.find();
  }

  async findByEHRSystem(ehrSystem: string): Promise<EHRMapping[]> {
    return this.ehrMappingRepo.find({ where: { ehrSystem } });
  }

  /**
   * Get a list of unique EHR system names.
   */
  async findAllEHRSystems(): Promise<string[]> {
    const result: { ehrSystem: string }[] = await this.ehrMappingRepo
      .createQueryBuilder('ehr')
      .select('DISTINCT ehr.ehrSystem', 'ehrSystem')
      .getRawMany();

    return result.map((row: { ehrSystem: string }) => row.ehrSystem);
  }

  /**
   *Bulk insert new EHR mappings
   */
  async createMapping(data: Partial<EHRMapping>[]): Promise<EHRMapping[]> {
    return await this.ehrMappingRepo.save(data);
  }

  async updateMapping(
    id: number,
    data: Partial<EHRMapping>,
  ): Promise<EHRMapping> {
    // Check if the mapping exists before updating
    const existingMapping = await this.ehrMappingRepo.findOneBy({ id });

    if (!existingMapping) {
      throw new NotFoundException(`EHRMapping with id ${id} not found`);
    }

    // Merge the new data into the existing entity
    const updatedMapping = this.ehrMappingRepo.merge(existingMapping, data);

    // Save and return the updated entity
    return await this.ehrMappingRepo.save(updatedMapping);
  }

  async deleteMapping(id: number): Promise<void> {
    await this.ehrMappingRepo.delete(id);
  }

  async deleteByEHRSystem(ehrSystem: string): Promise<void> {
    await this.ehrMappingRepo.delete({ ehrSystem });
  }
}
