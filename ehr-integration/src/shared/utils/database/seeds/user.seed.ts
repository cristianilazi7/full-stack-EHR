import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { User } from 'src/infrastructure/entities/user.entity';

@Injectable()
export class UserSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const existingUsers = await this.userRepository.count();
    if (existingUsers > 0) {
      return;
    }

    const defaultUsers: Partial<User>[] = [
      {
        email: process.env.ADMIN_EMAIL || 'admin@test.com',
        name: 'Admin User',
        password: await bcrypt.hash(
          process.env.ADMIN_PASSWORD || 'Admin123',
          10,
        ),
        role: 'ROLE_ADMIN',
      },
      {
        email: process.env.DOCTOR_EMAIL || 'doctor@test.com',
        name: 'Doctor User',
        password: await bcrypt.hash(
          process.env.DOCTOR_PASSWORD || 'Doctor123',
          10,
        ),
        role: 'ROLE_DOCTOR',
      },
      {
        email: process.env.PATIENT_EMAIL || 'patient@test.com',
        name: 'Patient User',
        password: await bcrypt.hash(
          process.env.PATIENT_PASSWORD || 'Patient123',
          10,
        ),
        role: 'ROLE_PATIENT',
      },
    ];

    await this.userRepository.save(defaultUsers);
  }
}
