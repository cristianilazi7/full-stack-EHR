import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/core/auth/jwt-auth.guard';
import { EHRSystemNameDTO } from 'src/core/dto/ehr-system-name-dto';
import { EHRMappingService } from 'src/core/services/ehr-mapping.service';
import { EHRMappingRepository } from 'src/infrastructure/repositories/ehr-mapping.repository';

@Resolver()
export class EHRManagementResolver {
  constructor(
    private readonly ehrMappingService: EHRMappingService,
    private readonly ehrMappingRepository: EHRMappingRepository,
  ) {}

  /**
   * Add or update an EHR system's mappings
   */
  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async addOrUpdateEHRMappings(
    @Args('ehrSystem') ehrSystem: string,
    @Args('mappings', { type: () => String }) mappingsJson: string,
  ): Promise<boolean> {
    if (!ehrSystem || !mappingsJson) {
      throw new Error('ehrSystem and mappings are required');
    }
    const mappings: Record<string, string> = JSON.parse(mappingsJson) as Record<
      string,
      string
    >;
    await this.ehrMappingService.upsertEHRMappings(ehrSystem, mappings);
    return true;
  }

  /**
   * Fetches a list of unique EHR system names.
   */
  @Query(() => [EHRSystemNameDTO]) // Asegura que sea un array de objetos DTO
  async getEHRSystems(): Promise<EHRSystemNameDTO[]> {
    const ehrSystems = await this.ehrMappingRepository.findAllEHRSystems();
    return ehrSystems.map((ehr) => {
      const dto = new EHRSystemNameDTO();
      dto.ehrSystem = ehr;
      return dto;
    });
  }
}
