import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { metadataScope, reqCurrentUser } from '../common/shared/constants';
import { MetadataPermission } from '../common/shared/types';
import { AuthApiService } from '../auth-api.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected reflector: Reflector,
    protected readonly authApiService: AuthApiService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let accessToken = request.headers.authorization;
    if (!accessToken) throw new UnauthorizedException('Invalid token');

    accessToken = accessToken.replace('Bearer ', '');
    request[reqCurrentUser] = await this.currentUser(accessToken);

    const scope: MetadataPermission = this.reflector.get<MetadataPermission>(
      metadataScope,
      context.getHandler()
    );

    const validScope = scope
      ? Object.prototype.hasOwnProperty.call(scope, metadataScope)
      : false;
    const func = scope ? this.authorization : this.authentication;
    const auth = func.bind(this);

    return auth(accessToken, validScope ? scope[metadataScope] : []);
  }

  async authentication(accessToken: string) {
    return await this.authApiService.authentication(accessToken);
  }
  async authorization(accessToken: string, scope: string[]) {
    return await this.authApiService.authorization(accessToken, scope);
  }

  async currentUser(accessToken: string) {
    return await this.authApiService.currentUser(accessToken);
  }
}
