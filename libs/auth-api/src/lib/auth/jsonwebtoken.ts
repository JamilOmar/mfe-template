import {
  verify,
  VerifyOptions,
  VerifyErrors,
  Algorithm,
  JwtPayload,
  JwtHeader,
  SigningKeyCallback,
} from 'jsonwebtoken';
import { Logger } from '@nestjs/common';
import axios from 'axios';
import { JwksClient } from 'jwks-rsa';
import { JwtAlgorithms } from '../common/shared/constants';
import { ClientCredentials, User } from '../common/shared/types';

export class Jsonwebtoken {
  private logger = new Logger(Jsonwebtoken.name);
  private readonly algorithms: Algorithm[] = JwtAlgorithms;
  private scope: string;
  private separator: string;
  private audience: string;
  private issuer: string;
  private jwksUri: string;
  private cache: boolean;
  private rateLimit: boolean;
  private jwksRequestsPerMinute: number;
  private idTokenUrl: string;

  constructor(clientCredentials: ClientCredentials) {
    this.scope = clientCredentials.scope;
    this.audience = clientCredentials.audience;
    this.issuer = clientCredentials.issuer;
    this.jwksUri = clientCredentials.jwksUri;
    this.cache = clientCredentials.jwksCache;
    this.rateLimit = clientCredentials.jwksRateLimit;
    this.jwksRequestsPerMinute = clientCredentials.jwksRequestPerTime;
    this.idTokenUrl = clientCredentials.idTokenUrl;
    this.separator = clientCredentials.separator;
  }

  private tokenValidator(
    accessToken: string,
    scope: string[] | null
  ): Promise<boolean> {
    return new Promise((resolve) => {
      if (!accessToken) return resolve(false);
      const authVerifyOptions: VerifyOptions = {
        algorithms: this.algorithms,
        audience: this.audience,
        issuer: this.issuer,
      };
      const client = new JwksClient({
        cache: this.cache,
        rateLimit: this.rateLimit,
        jwksRequestsPerMinute: this.jwksRequestsPerMinute,
        jwksUri: this.jwksUri,
      });

      function getKey(header: JwtHeader, callback: SigningKeyCallback) {
        client.getSigningKey(header.kid, function (err, key) {
          const signingKey = key?.getPublicKey();
          callback(null, signingKey);
        });
      }

      verify(
        accessToken,
        getKey,
        authVerifyOptions as any,
        (err, decoded: any) => {
          if (err) {
            this.logger.error(err);

            return resolve(false);
          }

          if (!scope) return resolve(true);

          if (Object.prototype.hasOwnProperty.call(decoded, this.scope)) {
            const permissions = Array.isArray(decoded[this.scope])
              ? decoded[this.scope]
              : decoded[this.scope].split(this.separator);

            return resolve(
              permissions.some((permission: any) => scope.includes(permission))
            );
          }

          return resolve(false);
        }
      );
    });
  }

  public async authentication(accessToken: string): Promise<boolean> {
    return await this.tokenValidator(accessToken, null);
  }

  public async authorization(
    accessToken: string,
    scope: string[]
  ): Promise<boolean> {
    if (!scope) return false;

    return await this.tokenValidator(accessToken, scope);
  }

  public async currentUser(accessToken: string): Promise<User> {
    try {
      const response = await axios({
        method: 'GET',
        url: this.idTokenUrl,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (err: any) {
      this.logger.error(err);

      return err;
    }
  }
}
