import { NgModule } from '@angular/core';
import { ConfigService } from '@jamilomar/base-ui';
import {
  AuthModule,
  OpenIdConfiguration,
  StsConfigLoader,
  StsConfigStaticLoader,
} from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      loader: {
        provide: StsConfigLoader,
        useFactory: (configService: ConfigService) => {
          const config = (configService.get('auth') ||
            {}) as OpenIdConfiguration;
          return new StsConfigStaticLoader(config);
        },
        deps: [ConfigService],
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
