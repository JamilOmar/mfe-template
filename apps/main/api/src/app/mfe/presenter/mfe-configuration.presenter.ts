import { ApiProperty } from '@nestjs/swagger';
import { MFEConfiguration } from '../mfe-configuration.schema';

export class MFEConfigurationPresenter {
  @ApiProperty()
  code: string;

  @ApiProperty()
  route: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  module: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  configuration: object;

  @ApiProperty()
  name: string;

  @ApiProperty()
  label: string;

  @ApiProperty()
  moduleClass: string;

  constructor(mfeConfiguration: MFEConfiguration) {
    this.code = mfeConfiguration.code;
    this.route = mfeConfiguration.route;
    this.description = mfeConfiguration.description;
    this.module = mfeConfiguration.module;
    this.url = mfeConfiguration.url;
    this.configuration = mfeConfiguration.configuration;
    this.name = mfeConfiguration.name;
    this.label = mfeConfiguration.label;
    this.moduleClass = mfeConfiguration.moduleClass;
  }
}
