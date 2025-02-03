import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EHRMapping } from 'src/infrastructure/entities/ehr-mapping.entity';
import { AllscriptsMappings, AthenaMappings } from '../../jsons/jsons.ehr';

@Injectable()
export class EHRMappingSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(EHRMapping)
    private readonly ehrMappingRepository: Repository<EHRMapping>,
  ) {}

  async onModuleInit() {
    const existingMappings = await this.ehrMappingRepository.count();
    if (existingMappings > 0) {
      return;
    }

    const athenaMappings = Object.entries(AthenaMappings).map(
      ([sourceField, targetField]) => ({
        ehrSystem: 'Athena',
        sourceField,
        targetField,
      }),
    );

    const allscriptsMappings = Object.entries(AllscriptsMappings).map(
      ([sourceField, targetField]) => ({
        ehrSystem: 'Allscripts',
        sourceField,
        targetField,
      }),
    );

    await this.ehrMappingRepository.save([
      ...athenaMappings,
      ...allscriptsMappings,
    ]);
  }
}
