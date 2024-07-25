import { loadRemoteModule } from '@nx/angular/mf';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MFEConfiguration } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DynamicAppLoaderService {
  constructor(private router: Router) {}

  /**
   * @description Loading the list remote application's module using module federation in the current scope
   * @param remoteModuleList the list of remote modules
   */
  public loadModuleList(remoteModuleList: MFEConfiguration[]) {
    for (const record of remoteModuleList) {
      if (!record.moduleClass && !record.module) {
        continue;
      }

      this.loadModule(record);
    }
  }

  /**
   * @description Loading the remote application's module using module federation in the current scope
   * @param remoteModule the remote module instance
   */
  public loadModule(remoteModule: MFEConfiguration) {
    /* moduleLoader call will be delayed until route is accessed */
    const moduleLoader = () =>
      loadRemoteModule(remoteModule.name, remoteModule.module).then(
        (module) => module[remoteModule.moduleClass]
      );
    const config = this.router.config;
    config.push({ path: remoteModule.route, loadChildren: moduleLoader });
    this.router.resetConfig(config);
  }
}
