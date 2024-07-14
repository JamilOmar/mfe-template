import { PartialType } from '@nestjs/mapped-types';
import { CreateMFEConfigurationDto } from './create-mfe-configuration-dto';
import { OmitType } from '@nestjs/swagger';

export class UpdateMFEConfigurationDto extends PartialType(
  OmitType(CreateMFEConfigurationDto, ['code'] as const)
) {}
