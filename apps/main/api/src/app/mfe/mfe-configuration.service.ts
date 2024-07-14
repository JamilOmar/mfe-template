import { Injectable } from '@nestjs/common';
import { CreateMFEConfigurationDto } from './dto/create-mfe-configuration-dto';
import { MFEConfiguration } from './mfe-configuration.schema';
import { MFEConfigurationRepository } from './mfe-configuration.repository';
import { UpdateMFEConfigurationDto } from './dto/update-mfe-configuration-dto';
const MFE_ALREADY_EXISTS_ERROR = 'MFE already exists';
const MFE_NOT_FOUND_ERROR = 'MFE not found;';
@Injectable()
export class MFEConfigurationService {
  constructor(
    private readonly mfeConfigurationRepository: MFEConfigurationRepository
  ) {}

  async create(
    createRemoteModuleDto: CreateMFEConfigurationDto
  ): Promise<MFEConfiguration> {
    if (this.exists(createRemoteModuleDto.code)) {
      throw new Error(MFE_ALREADY_EXISTS_ERROR);
    }
    return this.mfeConfigurationRepository.create(createRemoteModuleDto);
  }

  findAll(): Promise<MFEConfiguration[]> {
    return this.mfeConfigurationRepository.findAll();
  }

  update(
    code: string,
    updateRemoteModuleDto: UpdateMFEConfigurationDto
  ): Promise<MFEConfiguration> {
    if (!this.exists(code)) {
      throw new Error(MFE_NOT_FOUND_ERROR);
    }
    return this.mfeConfigurationRepository.update(code, updateRemoteModuleDto);
  }
  async remove(code: string) {
    if (!this.exists(code)) {
      throw new Error(MFE_NOT_FOUND_ERROR);
    }
    return this.mfeConfigurationRepository.remove(code);
  }

  findOne(code: string) {
    return this.mfeConfigurationRepository.findOne(code);
  }
  async exists(code: string) {
    return (await this.mfeConfigurationRepository.findOne(code)) != null;
  }
}
