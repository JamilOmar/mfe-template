import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MFEConfiguration } from './types';
import { ConfigService, EventService } from '@axleresearch/base-ui';
import { DynamicAppLoaderService } from './services/dynamic-app-loader.service';
import { EventKeys } from './app.initializer';
import { ConfigVars } from './utils/constants';
import { OidcSecurityService, LoginResponse } from 'angular-auth-oidc-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'main-app';
  public remoteApps: MFEConfiguration[] = [];
  private readonly oidcSecurityService = inject(OidcSecurityService);

  constructor(
    private configService: ConfigService,
    private dynamicAppLoader: DynamicAppLoaderService,
    private eventService: EventService
  ) {}

  ngOnInit() {
    this.loadRemoteModules();
    this.eventService.get(EventKeys.RemoteApps).next(this.remoteApps);

    this.oidcSecurityService
      .checkAuth()
      .subscribe((loginResponse: LoginResponse) => {
        const { isAuthenticated, userData, accessToken, idToken, configId } =
          loginResponse;
      });

    this.eventService
      .get(EventKeys.RemoteApps)
      .subscribe((remoteApps: MFEConfiguration[]) => {
        this.remoteApps = remoteApps;
        this.dynamicAppLoader.loadModuleList(this.remoteApps);
      });
  }

  /**
   * @description Loading the remote login module
   */
  public loadRemoteModules() {
    const appsJson =
      this.configService.get<string>(ConfigVars.remoteApplications) || '[]';

    this.remoteApps = JSON.parse(appsJson) || [];

    this.dynamicAppLoader.loadModuleList(this.remoteApps);
  }
}
