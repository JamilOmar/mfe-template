import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './../config/configuration';
import { MFEConfigurationModule } from './mfe/mfe-configuration.module';
import { AuthApiModule } from '@jamilomar/auth-api';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('db.url'),
        retryWrites: false,
      }),
      inject: [ConfigService],
    }),
    MFEConfigurationModule,
    AuthApiModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('auth.credentials'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
