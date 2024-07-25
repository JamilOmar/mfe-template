export interface MFEConfiguration {
  code: string;
  route: string;
  description: string;
  module: string;
  url: string;
  configuration: object;
  name: string;
  label: string;
  moduleClass: string;
}

export interface CreateMFEConfigurationDto {
  code: string;
  name: string;
  route: string;
  module: string;
  url: string;
  configuration: object;
  label: string;
  moduleClass: string;
}

export type UpdateMFEConfigurationDto = Omit<CreateMFEConfigurationDto, 'code'>;

export interface ServiceConfig {
  baseUrl: string;
}

export interface GridEventParams<T> {
  event: unknown;
  rowData: T;
}
