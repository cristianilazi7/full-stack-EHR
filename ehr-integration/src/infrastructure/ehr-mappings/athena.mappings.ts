import { EHRfileMapping } from 'src/core/domain/ehr-mapping.model';
import { EHRIntegration } from 'src/core/interfaces/ehr-integration.interface';

export const AthenaMappings: EHRfileMapping<string> = {
  name: 'patient.PATIENT_IDENT_NAME',
  gender: 'patient.GENDER_OF_PATIENT',
  dob: 'patient.DATE_OF_BIRTH_PATIENT',
  address: 'patient.PATIENT_LOCATION_ADDRESS',
  phone: 'patient.TELEPHONE_NUMBER_PATIENT',
  email: 'patient.PATIENT_EMAIL_ID',
  emergencyContact: 'patient.EMERGENCY_CONTACT_PATIENT',
  insuranceProvider: 'patient.INSURANCE_PROVIDER_PATIENT',
  insurancePolicyNumber: 'patient.POLICY_NUMBER_INSURANCE_PATIENT',
  primaryCarePhysician: 'patient.PRIMARY_CARE_DOCTOR_PATIENT',
  allergies: 'patient.ALLERGIES_PATIENT',
  currentMedications: 'patient.PATIENT_MEDICATIONS_CURRENT',
  medicalHistory: 'patient.HISTORY_MEDICAL_PATIENT',
  socialHistory: 'patient.HISTORY_SOCIAL_PATIENT',
  familyHistory: 'patient.HISTORY_FAMILY_PATIENT',
};

export class AthenaIntegration<T = unknown> implements EHRIntegration<T> {
  mapData(inputData: Record<string, T>): Record<string, T> {
    return Object.keys(inputData).reduce(
      (mappedData: Record<string, T>, key) => {
        const mappedKey = AthenaMappings[key];
        if (mappedKey) {
          mappedData[mappedKey] = inputData[key];
        }
        return mappedData;
      },
      {} as Record<string, T>,
    );
  }
}
