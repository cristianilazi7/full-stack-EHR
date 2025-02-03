import { EHRSystemMappings } from 'src/core/domain/ehr-mapping.model';
import { AthenaMappings, AllscriptsMappings } from './index';

export const EHRMappings: EHRSystemMappings<string> = {
  Athena: AthenaMappings,
  Allscripts: AllscriptsMappings,
};
