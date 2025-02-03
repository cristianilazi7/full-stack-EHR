export interface EHRfileMapping<T> {
  [key: string]: T;
}

export interface EHRSystemMappings<T> {
  [ehrSystem: string]: EHRfileMapping<T>;
}
