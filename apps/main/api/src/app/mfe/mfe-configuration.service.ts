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
    const exists = await this.exists(createRemoteModuleDto.code);
    if (exists) {
      throw new Error(MFE_ALREADY_EXISTS_ERROR);
    }
    return this.mfeConfigurationRepository.create(createRemoteModuleDto);
  }

  findAll(): Promise<MFEConfiguration[]> {
    return this.mfeConfigurationRepository.findAll();
  }

  async update(
    code: string,
    updateRemoteModuleDto: UpdateMFEConfigurationDto
  ): Promise<void> {
    const exists = await this.exists(code);
    if (!exists) {
      throw new Error(MFE_NOT_FOUND_ERROR);
    }
    await this.mfeConfigurationRepository.update(code, updateRemoteModuleDto);
  }
  async remove(code: string) {
    const exists = await this.exists(code);
    if (!exists) {
      throw new Error(MFE_NOT_FOUND_ERROR);
    }
    return this.mfeConfigurationRepository.remove(code);
  }

  findOne(code: string) {
    return this.mfeConfigurationRepository.findOne(code);
  }
  async exists(code: string) {
    const data = await this.mfeConfigurationRepository.findOne(code);
    return data != null;
  }
}
