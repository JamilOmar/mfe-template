import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { BaseUIModule, ConfigService } from '@axleresearch/base-ui';
import { initializer } from './app.initializer';
import { AuthConfigModule } from './auth/auth-config.module';
import { AuthInterceptorService } from './common/interceptors/auth.interceptor';
import { ConfigurationFile } from './utils/constants';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BaseUIModule.forRoot(),
    AuthConfigModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (httpClient: HttpClient, configService: ConfigService) => {
        return async () => {
          await initializer(httpClient, configService, ConfigurationFile);
        };
      },
      deps: [HttpClient, ConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
