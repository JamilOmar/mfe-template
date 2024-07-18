import { DynamicModule, Global, Module } from '@nestjs/common';
import { AuthApiService } from './auth-api.service';
import { SETTING_OPTIONS } from './common/shared/constants';
import { ClientCredentials, ModuleAsyncOptions } from './common/shared/types';

@Global()
@Module({})
export class AuthApiModule {
  static forRoot(settings: ClientCredentials): DynamicModule {
    return {
      module: AuthApiModule,
      providers: [
        {
          provide: SETTING_OPTIONS,
          useValue: settings,
        },
        AuthApiService,
      ],
      exports: [AuthApiService],
    };
  }

  static forRootAsync(
    settings: ModuleAsyncOptions<ClientCredentials>
  ): DynamicModule {
    return {
      module: AuthApiModule,
      providers: [
        {
          provide: SETTING_OPTIONS,
          ...settings,
        },
        AuthApiService,
      ],
      exports: [AuthApiService],
    };
  }
}
