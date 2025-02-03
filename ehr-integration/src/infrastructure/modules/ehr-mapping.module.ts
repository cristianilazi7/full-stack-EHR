import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EHRMapping } from '../entities/ehr-mapping.entity';
import { EHRMappingRepository } from '../repositories/ehr-mapping.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EHRMapping])],
  providers: [EHRMappingRepository],
  exports: [EHRMappingRepository, TypeOrmModule],
})
export class EHRMappingModule {}
