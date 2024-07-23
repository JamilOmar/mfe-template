import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MFEConfigurationService } from './mfe-configuration.service';
import { ApiResponse } from '@nestjs/swagger';
import { CreateMFEConfigurationDto } from './dto/create-mfe-configuration-dto';
import { MFEConfiguration } from './mfe-configuration.schema';
import { UpdateMFEConfigurationDto } from './dto/update-mfe-configuration-dto';
import { MFEConfigurationPresenter } from './presenter/mfe-configuration.presenter';

const MFE_ALREADY_EXISTS_ERROR = 'MFE Configuration already exists';
const MFE_NOT_FOUND_ERROR = 'MFE Configuration not found;';
const MFE_CREATED = 'Returns the MFE Configuration created';
const MFE_SUCCEES = 'MFE Configuration operation succeed';
const MFE_INVALID = 'Bad request/invalid MFE Configuration';
@Controller('administration/modules')
export class MFEConfigurationController {
  constructor(
    private readonly mfeConfigurationService: MFEConfigurationService
  ) {}
  @ApiResponse({
    status: 201,
    description: MFE_CREATED,
    type: CreateMFEConfigurationDto,
  })
  @ApiResponse({
    status: 400,
    description: MFE_INVALID,
  })
  @ApiResponse({ status: 422, description: MFE_ALREADY_EXISTS_ERROR })
  @Post()
  async create(
    @Body() createMFEConfigurationDto: CreateMFEConfigurationDto
  ): Promise<MFEConfigurationPresenter> {
    const data = await this.mfeConfigurationService.create(
      createMFEConfigurationDto
    );
    return new MFEConfigurationPresenter(data);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: MFE_SUCCEES,
    type: MFEConfiguration,
    isArray: true,
  })
  async findAll(): Promise<MFEConfigurationPresenter[]> {
    const data = await this.mfeConfigurationService.findAll();
    return data.map((x) => new MFEConfigurationPresenter(x));
  }

  @ApiResponse({
    status: 200,
    description: MFE_SUCCEES,
    type: CreateMFEConfigurationDto,
  })
  @ApiResponse({ status: 404, description: MFE_NOT_FOUND_ERROR })
  @Get(':code')
  async findOne(
    @Param('code') code: string
  ): Promise<MFEConfigurationPresenter> {
    const data = await this.mfeConfigurationService.findOne(code);
    return new MFEConfigurationPresenter(data);
  }

  @ApiResponse({
    status: 200,
    description: MFE_SUCCEES,
    type: UpdateMFEConfigurationDto,
  })
  @ApiResponse({ status: 404, description: MFE_NOT_FOUND_ERROR })
  @Patch(':code')
  async update(
    @Param('code') code: string,
    @Body() updateRemoteModuleDto: UpdateMFEConfigurationDto
  ): Promise<void> {
    await this.mfeConfigurationService.update(code, updateRemoteModuleDto);
  }

  @ApiResponse({
    status: 200,
    description: MFE_SUCCEES,
    type: UpdateMFEConfigurationDto,
  })
  @Delete(':code')
  async remove(@Param('code') code: string): Promise<void> {
    await this.mfeConfigurationService.remove(code);
  }
}
