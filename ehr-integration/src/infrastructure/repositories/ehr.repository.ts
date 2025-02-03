import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { TransactionRepository } from './transaction.repository';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class EHRRepository {
  private readonly logger = new Logger(EHRRepository.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async findUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      console.log('EHRRepository User:', user);
      if (!user) {
        this.logger.warn(`⚠️ User with email ${email} not found.`);
        return null; // En lugar de lanzar la excepción directamente
      }
      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`Error fetching user: ${error.message}`);
      } else {
        this.logger.error('Error fetching user: unknown error');
      }
      throw new NotFoundException(`User with email ${email} not found.`);
    }
  }

  async saveTransaction(
    userId: number,
    ehrSystem: string,
    mappedData: Record<string, unknown>,
  ) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      this.logger.warn(`⚠️ Cannot save transaction. User ${userId} not found.`);
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const transaction = new Transaction();
    transaction.userId = user.id;
    transaction.ehrSystem = ehrSystem;
    transaction.data = mappedData;
    transaction.timestamp = new Date();

    return this.transactionRepository.save(transaction);
  }
}
