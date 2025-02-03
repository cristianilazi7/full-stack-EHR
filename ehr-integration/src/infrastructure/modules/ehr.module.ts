import { Module } from '@nestjs/common';
import { UserModule } from './user.module';
import { TransactionModule } from './transaction.module';
import { EHRRepository } from '../repositories/ehr.repository';

@Module({
  imports: [UserModule, TransactionModule],
  providers: [EHRRepository],
  exports: [EHRRepository],
})
export class EHRModule {}
