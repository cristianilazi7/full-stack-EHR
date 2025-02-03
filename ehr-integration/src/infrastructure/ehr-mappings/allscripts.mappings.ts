import { EHRIntegration } from 'src/core/interfaces/ehr-integration.interface';
import { EHRfileMapping } from 'src/core/domain/ehr-mapping.model';

export const AllscriptsMappings: EHRfileMapping<string> = {
  name: 'patient.p_name',
  gender: 'patient.p_gender',
  dob: 'patient.p_dob',
  address: 'patient.p_address',
  phone: 'patient.p_phone',
  email: 'patient.p_email',
  emergencyContact: 'patient.p_emergencyContact',
  insuranceProvider: 'patient.p_insuranceProvider',
  insurancePolicyNumber: 'patient.p_insurancePolicyNumber',
  primaryCarePhysician: 'patient.p_primaryCarePhysician',
  medicalHistory: 'patient.p_medicalHistory',
  allergies: 'patient.p_allergies',
  currentMedications: 'patient.p_currentMedications',
  socialHistory: 'patient.p_socialHistory',
  familyHistory: 'patient.p_familyHistory',
};

export class AllscriptsIntegration<T = unknown> implements EHRIntegration<T> {
  mapData(inputData: Record<string, T>): Record<string, T> {
    return Object.keys(inputData).reduce(
      (mappedData: Record<string, T>, key) => {
        const mappedKey = AllscriptsMappings[key];
        if (mappedKey) {
          mappedData[mappedKey] = inputData[key];
        }
        return mappedData;
      },
      {} as Record<string, T>,
    );
  }
}
