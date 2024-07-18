import { FactoryProvider } from '@nestjs/common';

export interface ClientCredentials {
  scope: string;
  separator: string;
  audience: string;
  issuer: string;
  jwksUri: string;
  jwksCache: boolean;
  jwksRateLimit: boolean;
  jwksRequestPerTime: number;
  idTokenUrl: string;
}

export type MetadataPermission = {
  permissions: string[];
};

export type User = {
  data?: any;
  user?: any;
  code?: string;
};

export type ModuleAsyncOptions<Options> = Pick<
  FactoryProvider<Options>,
  'inject' | 'useFactory'
>;
