import { Controller, Get } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { readFile } from 'fs';
import { promisify } from 'util';
import { join } from 'path';

const readFileAsync = promisify(readFile);
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getData() {
    this.logger.log(this.configService.get('title'));
    return this.appService.getData();
  }
  @Get('version')
  async getVersion() {
    const apiProjectPkg = join(__dirname, 'package.json');
    const file = await readFileAsync(apiProjectPkg);
    const pkgJson = JSON.parse(file.toString());
    const appInfo = { version: pkgJson.version, name: pkgJson.name };
    return appInfo;
  }
}
