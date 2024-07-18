import { Injectable, Optional, Inject } from '@angular/core';
import { Config } from './config.types';
import defaults from './default.config.service';
import * as _ from 'lodash';
import { APP_CONF } from '../global.keys';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private config: Config = {};
  constructor(@Optional() @Inject(APP_CONF) configuration: Config) {
    this.load(configuration);
  }
  public set<Type>(key: string, value: Type): void {
    if (_.isUndefined(value)) {
      return;
    }

    if (_.isObject(value)) {
      this.config[key] = _.defaults(value, this.config[key]);
    } else {
      this.config[key] = value;
    }
  }

  public get<Type>(key: string, defaultValue?: Type): Type {
    return _.get(this.config, key, defaultValue);
  }

  public has(key: string): boolean {
    return _.has(this.config, key);
  }

  public load(configuration?: Config) {
    this.config = _.defaultsDeep(configuration, defaults);
  }
}
