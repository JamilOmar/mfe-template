import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Config, ConfigService, EventService } from '@jamilomar/base-ui';
import { setRemoteDefinitions } from '@nx/angular/mf';
import { ConfigVars, RemoteModulesEndpoint } from './utils/constants';
import { MFEConfiguration } from './types';
export const EventKeys = {
  RemoteApps: 'remoteApps',
};

export async function initializer(
  httpClient: HttpClient,
  configService: ConfigService,
  configurationUrl: string
): Promise<void> {
  let configuration;
  try {
    const response = await fetch(configurationUrl);
    configuration = await response.json();
  } catch (err) {
    configuration = {};
  }
  configService.load(configuration as Config);
  await loadRemoteApplications(httpClient, configService);
}

/***
 * @description: Loading the remote applications consuming the API
 */
export async function loadRemoteApplications(
  httpClient: HttpClient,
  configService: ConfigService,
  eventService?: EventService
) {
  const remoteModuleUrl = `${configService.get(
    ConfigVars.apiUrl
  )}${RemoteModulesEndpoint}`;
  const remoteModules = await firstValueFrom(
    httpClient.get<MFEConfiguration[]>(remoteModuleUrl)
  );

  if (eventService) {
    eventService.get(EventKeys.RemoteApps).next(remoteModules);
  }
  configService.set(
    ConfigVars.remoteApplications,
    JSON.stringify(remoteModules)
  );
  const remoteModuleDefinitions = {};
  remoteModules.map((module: MFEConfiguration) => {
    Object.defineProperty(remoteModuleDefinitions, module['name'], {
      value: module['url'],
      enumerable: true,
      writable: true,
      configurable: true,
    });
    configService.set(module['name'], module['configuration']);
  });
  return setRemoteDefinitions(remoteModuleDefinitions);
}
