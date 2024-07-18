import { Algorithm } from 'jsonwebtoken';
export const SETTING_OPTIONS = 'SETTING_OPTIONS';
export const metadataScope = 'permissions';
export const reqCurrentUser = 'authApiCurrentUser';

export const JwtAlgorithms: Algorithm[] = [
  'HS256',
  'HS384',
  'HS512',
  'RS256',
  'RS384',
  'RS384',
  'RS512',
  'ES256',
  'ES384',
  'ES512',
  'PS256',
  'PS384',
  'PS512',
];
