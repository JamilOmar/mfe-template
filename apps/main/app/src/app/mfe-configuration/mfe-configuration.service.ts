import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import {
  CreateMFEConfigurationDto,
  MFEConfiguration,
  ServiceConfig,
  UpdateMFEConfigurationDto,
} from './types';
import { ConfigVars, RemoteModulesEndpoint } from '../utils/constants';
import { ConfigService } from '@axleresearch/base-ui';

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>(
  'ServiceConfig'
);

@Injectable({
  providedIn: 'root',
})
export class MFEConfigurationService {
  private readonly serviceUrl: string;

  constructor(
    private configService: ConfigService,
    protected httpClient: HttpClient
  ) {
    this.serviceUrl = `${configService.get(
      ConfigVars.apiUrl
    )}${RemoteModulesEndpoint}`;
  }

  create(createRemoteModuleDto: CreateMFEConfigurationDto) {
    return this.httpClient.post<MFEConfiguration>(
      this.serviceUrl,
      createRemoteModuleDto
    );
  }

  findAll() {
    return this.httpClient.get<MFEConfiguration[]>(this.serviceUrl);
  }

  update(
    code: string | undefined,
    updateRemoteModuleDto: UpdateMFEConfigurationDto
  ) {
    return this.httpClient.patch<MFEConfiguration>(
      `${this.serviceUrl}/${code}`,
      updateRemoteModuleDto
    );
  }
  remove(code: string) {
    return this.httpClient.delete<number>(`${this.serviceUrl}/${code}`);
  }

  findOne(code: string) {
    return this.httpClient.get<MFEConfiguration>(`${this.serviceUrl}/${code}`);
  }
}
