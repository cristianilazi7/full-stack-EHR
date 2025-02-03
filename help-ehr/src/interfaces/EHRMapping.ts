export interface EHRMapping {
    ehrSystem: string;
    sourceField: string;
    targetField?: string; // Puede estar vacío al obtener solo los campos fuente
  }
  