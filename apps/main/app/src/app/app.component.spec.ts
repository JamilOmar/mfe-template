import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AuthConfigModule } from './auth/auth-config.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseUIModule, EventService } from '@jamilomar/base-ui';
import { DynamicAppLoaderService } from './services/dynamic-app-loader.service';
import { MFEConfiguration } from './types';

describe('AppComponent', () => {
  class MockDynamicAppLoaderService {
    loadModuleList(remoteModules: MFEConfiguration[]) {
      return;
    }
  }

  class MockConfigService {
    get(argument: string) {
      return;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BaseUIModule.forRoot({
          configuration: {
            title: '',
            apiUrl: 'http://127.0.0.1:3333/api/',
            auth: {
              authority: 'https://a-ci.labshare.org/_api/auth/ls',
              redirectUrl: 'https://local.mylocal.org:4200',
              postLogoutRedirectUri: 'https://local.mylocal.org:4200',
              clientId: 'auth-ui',
              scope: 'openid profile offline_access email',
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
              secureRoutes: ['http://localhost:8000'],
            },
          },
        }),
        AuthConfigModule,
      ],
      declarations: [AppComponent, NxWelcomeComponent],
      providers: [
        {
          provide: DynamicAppLoaderService,
          useClass: MockDynamicAppLoaderService,
        },
        EventService,
      ],
    }).compileComponents();
  });

  it(`should have as title 'main-app'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('main-app');
  });
});
