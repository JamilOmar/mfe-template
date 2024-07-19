import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BaseUIModule, ConfigService } from '@axleresearch/base-ui';
import { initializer } from './app.initializer';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    BaseUIModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (httpClient: HttpClient, configService: ConfigService) => {
        return async () => {
          await initializer(httpClient, configService, 'app.json');
        };
      },
      deps: [HttpClient, ConfigService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
