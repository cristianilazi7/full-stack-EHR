import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { MapEHRDataUseCase } from 'src/application/use-cases/map-ehr-data.use-case';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { User } from 'src/infrastructure/entities/user.entity';

@Controller('ehr')
export class EHRController {
  constructor(private readonly mapEHRDataUseCase: MapEHRDataUseCase) {}
  @UseGuards(JwtAuthGuard)
  @Post('map-data')
  async mapData<T>(
    @Request() req: { user: Partial<User> },
    @Body() body: { ehrSystem: string; inputData: Record<string, T> },
  ): Promise<Record<string, T> | { error: string }> {
    const { ehrSystem, inputData } = body;
    return await this.mapEHRDataUseCase.execute(ehrSystem, inputData);
  }
}
