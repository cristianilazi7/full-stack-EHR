import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { MapEHRDataUseCase } from './application/use-cases/map-ehr-data.use-case';
import { EHRResolver } from './presentation/graphql/ehr.resolver';
import { EHRController } from './presentation/controllers/ehr.controller';
import { EHRMappingService } from './core/services/ehr-mapping.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'typeorm';
import { User } from './infrastructure/entities/user.entity';
import { EHRModule } from './infrastructure/modules/ehr.module';
import { TransactionModule } from './infrastructure/modules/transaction.module';
import { UserModule } from './infrastructure/modules/user.module';
import { ValidationService } from './core/services/validation.service';
import { UserSeeder } from './shared/utils/database/seeds/user.seed';
import { AuthModule } from './core/auth/auth.module';
import { EHRMapping } from './infrastructure/entities/ehr-mapping.entity';
import { EHRMappingModule } from './infrastructure/modules/ehr-mapping.module';
import { EHRMappingSeeder } from './shared/utils/database/seeds/ehr-mapping.seeder';
import { EHRManagementResolver } from './presentation/graphql/ehr-management.resolver';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
      debug: process.env.GRAPHQL_DEBUG === 'true',
      introspection: process.env.GRAPHQL_INTROSPECTION === 'true',
      formatError: (error) => {
        const { extensions, ...rest } = error;
        return {
          ...rest,
          extensions: {
            code: extensions?.code || 'INTERNAL_SERVER_ERROR',
            statusCode: extensions?.statusCode || 500,
            message: extensions?.message || error.message,
          },
        };
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Transaction, EHRMapping],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    TransactionModule,
    EHRModule,
    AuthModule,
    EHRMappingModule,
  ],
  controllers: [AppController, EHRController],
  providers: [
    AppService,
    AppResolver,
    EHRResolver,
    EHRManagementResolver,
    MapEHRDataUseCase,
    EHRMappingService,
    ValidationService,
    UserSeeder,
    EHRMappingSeeder,
  ],
})
export class AppModule {}
