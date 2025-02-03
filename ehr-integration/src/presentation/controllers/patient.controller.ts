import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { Roles } from 'src/infrastructure/decorators/roles.decorator';
import { RolesGuard } from 'src/infrastructure/guards/roles.guard';

@Controller('patient')
@UseGuards(RolesGuard)
export class PatientController {
  @Get('history')
  @Roles('ROLE_PATIENT')
  getPatientHistory(@Req() req: Request & { user: { email: string } }) {
    return `History for patient ${req.user.email}`;
  }
}
