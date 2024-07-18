import { Inject, Injectable } from '@nestjs/common';
import { Auth } from './auth/auth';
import { SETTING_OPTIONS } from './common/shared/constants';
import { ClientCredentials, User } from './common/shared/types';

@Injectable()
export class AuthApiService {
  private auth: Auth;
  constructor(@Inject(SETTING_OPTIONS) settings: ClientCredentials) {
    this.auth = new Auth(settings);
  }

  public async authentication(accessToken: string): Promise<boolean> {
    return await this.auth.authentication(accessToken);
  }

  public async authorization(
    accessToken: string,
    scope: string[]
  ): Promise<boolean> {
    return await this.auth.authorization(accessToken, scope);
  }

  public async currentUser(accessToken: string): Promise<User> {
    return await this.auth.currentUser(accessToken);
  }
}
