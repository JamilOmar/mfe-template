import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';
import {
  CreateMFEConfigurationDto,
  MFEConfiguration,
  ServiceConfig,
  UpdateMFEConfigurationDto,
} from './types';

export const SERVICE_CONFIG = new InjectionToken<ServiceConfig>(
  'ServiceConfig'
);

const RESOURCE_ENDPOINT = '/administration/app';

@Injectable({
  providedIn: 'root',
})
export class MFEConfigurationService {
  private readonly baseUrl: string;
  private readonly resourceEndpoint: string;

  constructor(protected httpClient: HttpClient) {
    this.baseUrl = 'http://localhost:3333/api';
    this.resourceEndpoint = RESOURCE_ENDPOINT;
  }

  create(createRemoteModuleDto: CreateMFEConfigurationDto) {
    return this.httpClient.post<MFEConfiguration>(
      `${this.baseUrl}${this.resourceEndpoint}`,
      createRemoteModuleDto
    );
  }

  findAll() {
    return this.httpClient.get<MFEConfiguration[]>(
      `${this.baseUrl}${this.resourceEndpoint}`
    );
  }

  update(
    code: string | undefined,
    updateRemoteModuleDto: UpdateMFEConfigurationDto
  ) {
    console.log(updateRemoteModuleDto);
    return this.httpClient.patch<MFEConfiguration>(
      `${this.baseUrl}${this.resourceEndpoint}/${code}`,
      updateRemoteModuleDto
    );
  }
  remove(code: string) {
    return this.httpClient.delete<number>(
      `${this.baseUrl}${this.resourceEndpoint}/${code}`
    );
  }

  findOne(code: string) {
    return this.httpClient.get<MFEConfiguration>(
      `${this.baseUrl}${this.resourceEndpoint}/${code}`
    );
  }
}
