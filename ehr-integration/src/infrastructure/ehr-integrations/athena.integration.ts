import { EHRIntegration } from 'src/core/interfaces/ehr-integration.interface';
import { AthenaMappings } from '../ehr-mappings/athena.mappings';

export class AthenaIntegration<T = unknown> implements EHRIntegration<T> {
  mapData(inputData: Record<string, T>): Record<string, T> {
    return Object.keys(inputData).reduce(
      (mappedData: Record<string, T>, key) => {
        const mappedKey = (AthenaMappings as Record<string, string>)[key];
        if (mappedKey) {
          mappedData[mappedKey] = inputData[key];
        }
        return mappedData;
      },
      {} as Record<string, T>,
    );
  }
}
