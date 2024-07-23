import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMFEConfigurationDto {
  @ApiProperty({
    example: 'app_001',
    description: 'The code of the application, this is the unique identifier',
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    example: 'Login Module Name',
    description: 'The name to be displayed',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'http://localhost/my-module',
    description: 'The route to be used',
  })
  @IsString()
  @IsNotEmpty()
  route: string;

  @ApiProperty({
    example: './Module',
    description: 'The module code to load',
  })
  @IsString()
  @IsNotEmpty()
  module: string;

  @ApiProperty({
    example: 'http://external-project/modules',
    description: 'Location of the module',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    example: { api: 'http://my-api' },
    description: 'Configuration options of the module',
    default: {},
  })
  @IsObject()
  configuration: object;

  @ApiProperty({
    example: 'Login Menu',
    description: 'The label to show in links',
  })
  @IsString()
  label: string;

  @ApiProperty({
    example: 'This is an item',
    description: 'The description of the configuration',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'CatalogModule',
    description: 'The class name of the module to load',
  })
  @IsString()
  moduleClass: string;
}
