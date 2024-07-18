import { ConfigService } from './config.service';
import { TestBed } from '@angular/core/testing';
import { APP_CONF } from '../global.keys';

describe('ConfigService', () => {
  const configuration = {
    services: { analytics: { url: `http://localhost` } },
  };
  let configurationService: ConfigService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ConfigService,
        { provide: APP_CONF, useValue: configuration },
      ],
    });
    configurationService = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(configurationService).toBeDefined();
  });
  it('should be created with configuration and injected default configuration', () => {
    const hasConfiguration = configurationService.has('services.auth');
    expect(hasConfiguration).toBeFalsy();
  });
  it('should be created with configuration and add new values', () => {
    configurationService.set<number>('newValue', 12);
    const hasConfiguration = configurationService.has('newValue');
    expect(hasConfiguration).toBeTruthy();
  });
  it('should be created with configuration and load', () => {
    const val = configurationService.get<string>('services.analytics.url');
    expect(val).toBeTruthy();
    expect(val).toBe(`http://localhost`);
  });
  it('should be created with configuration and load default value', () => {
    const val = configurationService.get('services.analytics.test', 'test');
    expect(val).toBeTruthy();
    expect(val).toBe(`test`);
  });
});
