import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  versionKey: false,
})
export class MFEConfiguration extends Document {
  @Prop({ required: true, unique: true, _id: true })
  code: string;

  @Prop({ required: true, unique: true })
  route: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  module: string;

  @Prop({ required: true })
  url: string;

  @Prop({ type: Object })
  configuration: object;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  moduleClass: string;
}

export const MFEConfigurationSchema =
  SchemaFactory.createForClass(MFEConfiguration);
