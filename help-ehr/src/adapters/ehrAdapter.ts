import { EHRSystem } from "@/interfaces/ehr";
import { EHRMapping } from "@/interfaces/EHRMapping";

interface ehrAdapterResponse {
  getMappings: { sourceField: string, targetField: string }[];
}
interface ehrSystemAdapterResponse { 
  getEHRSystems: { ehrSystem: string; }[] 
}

export const ehrAdapter = (data: ehrAdapterResponse): EHRMapping[] => {
  return data.getMappings.map((item: { sourceField: string, targetField: string}) => ({
    ehrSystem: "", // Se puede establecer dinámicamente más adelante
    sourceField: item.sourceField,
    targetField: item.targetField
  }));
};
 
export const ehrSystemAdapter = (data: ehrSystemAdapterResponse ): EHRSystem[] => {
  if (!data || !data.getEHRSystems) return [];
  return data.getEHRSystems.map((ehr: { ehrSystem: string }) => ({
    ehrSystem: ehr.ehrSystem,
  }));
}