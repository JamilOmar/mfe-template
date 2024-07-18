import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './config/config.service';
import { APP_CONF } from './global.keys';
import { EventService } from './events/event.service';
import { BaseUIModuleSettings } from './global.types';

@NgModule({
  imports: [CommonModule],
})
export class BaseUIModule {
  constructor(@Optional() @SkipSelf() parentModule: BaseUIModule) {
    if (parentModule) {
      throw new Error(
        'BaseUIModule is already loaded. Import it in the root app module only'
      );
    }
  }
  static forRoot(
    settings: BaseUIModuleSettings = {
      configuration: {},
    }
  ): ModuleWithProviders<BaseUIModule> {
    return {
      ngModule: BaseUIModule,
      providers: [
        ConfigService,
        EventService,
        { provide: APP_CONF, useValue: settings.configuration },
      ],
    };
  }
}
