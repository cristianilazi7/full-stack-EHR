import { EHRIntegration } from 'src/core/interfaces/ehr-integration.interface';
import { AllscriptsMappings } from '../ehr-mappings/allscripts.mappings';

export class AllscriptsIntegration<T = unknown> implements EHRIntegration<T> {
  mapData(inputData: Record<string, T>): Record<string, T> {
    return Object.keys(inputData).reduce(
      (mappedData: Record<string, T>, key) => {
        const mappedKey = (AllscriptsMappings as Record<string, string>)[key];
        if (mappedKey) {
          mappedData[mappedKey] = inputData[key];
        }
        return mappedData;
      },
      {} as Record<string, T>,
    );
  }
}
