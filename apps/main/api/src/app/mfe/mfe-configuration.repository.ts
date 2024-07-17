import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MFEConfiguration } from './mfe-configuration.schema';
import { CreateMFEConfigurationDto } from './dto/create-mfe-configuration-dto';
import { UpdateMFEConfigurationDto } from './dto/update-mfe-configuration-dto';

export class MFEConfigurationRepository {
  constructor(
    @InjectModel(MFEConfiguration.name)
    private mfeConfigurationModel: Model<MFEConfiguration>
  ) {}

  async create(
    createRemoteModuleDto: CreateMFEConfigurationDto
  ): Promise<MFEConfiguration> {
    return this.mfeConfigurationModel.create(createRemoteModuleDto);
  }

  async findAll(): Promise<MFEConfiguration[]> {
    return this.mfeConfigurationModel.find().exec();
  }

  update(
    code: string,
    updateRemoteModuleDto: UpdateMFEConfigurationDto
  ): Promise<void> {
    this.mfeConfigurationModel
      .updateOne({ code }, updateRemoteModuleDto, { new: true })
      .exec();
    return;
  }
  async remove(code: string) {
    return this.mfeConfigurationModel.findOneAndDelete({ code }).exec();
  }

  findOne(code: string) {
    return this.mfeConfigurationModel.findOne({ code }).exec();
  }
}
