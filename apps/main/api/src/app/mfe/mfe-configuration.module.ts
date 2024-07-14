import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { MFEConfigurationController } from './mfe-configuration.controller';
import { MFEConfigurationService } from './mfe-configuration.service';
import { MFEConfigurationRepository } from './mfe-configuration.repository';
import {
  MFEConfiguration,
  MFEConfigurationSchema,
} from './mfe-configuration.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: MFEConfiguration.name,
        schema: MFEConfigurationSchema,
      },
    ]),
  ],
  controllers: [MFEConfigurationController],
  providers: [MFEConfigurationService, MFEConfigurationRepository],
})
export class MFEConfigurationModule {}
