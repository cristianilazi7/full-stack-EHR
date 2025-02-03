import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    if (typeof user.password !== 'string') {
      throw new Error('Password must be a string before hashing.');
    }

    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Unknown error hashing password';
      console.error(`Error hashing password: ${errorMessage}`);
      throw new Error(`Error hashing password: ${errorMessage}`);
    }

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } }) ?? null;
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } }) ?? null;
  }
}
