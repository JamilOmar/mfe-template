import { InjectionToken } from '@angular/core';

export const APP_CONF = new InjectionToken<any>('app.config.token');
export const APP_BUILD_VERSION = new InjectionToken<string>(
  'app.build.version.token'
);
export const APP_TYPE = new InjectionToken<string>('app.type.token');
