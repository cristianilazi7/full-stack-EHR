export interface EHRIntegration<T = unknown> {
  mapData(inputData: Record<string, T>): Record<string, T>;
}
