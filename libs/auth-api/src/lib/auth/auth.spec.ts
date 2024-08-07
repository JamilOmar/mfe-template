import { ClientCredentials } from '../common/shared/types';
import { Jsonwebtoken } from './jsonwebtoken';
import { Auth } from './auth';

let authService: Auth;
const validAccessToken = 'aa.bb.cc';
const invalidAccessToken = 'xx.yy.zz';
const validScope: string[] = ['read:documents', 'create:documents'];
const invalidScope: string[] = ['readable:documents', 'creatable:documents'];
const settings: ClientCredentials = {
  scope: '',
  audience: '',
  issuer: '',
  jwksUri: '',
  jwksCache: true,
  jwksRateLimit: true,
  jwksRequestPerTime: 5,
  idTokenUrl: '',
  separator: '',
};

describe('Auth', () => {
  beforeEach(() => {
    authService = new Auth(settings);

    jest
      .spyOn(Jsonwebtoken.prototype, 'authentication')
      .mockImplementation((token) => {
        return token === validAccessToken
          ? Promise.resolve(true)
          : Promise.resolve(false);
      });
    jest
      .spyOn(Jsonwebtoken.prototype, 'authorization')
      .mockImplementation((token, scope) =>
        token === validAccessToken &&
        scope.some((permission) => validScope.includes(permission))
          ? Promise.resolve(true)
          : Promise.resolve(false)
      );
    jest
      .spyOn(Jsonwebtoken.prototype, 'currentUser')
      .mockImplementation((token) =>
        token === validAccessToken
          ? Promise.resolve({ data: '1' })
          : Promise.resolve({})
      );
  });

  it('creates an instance of Auth', async () => {
    expect(authService).toBeDefined();
  });

  it('verifies authentication by a valid access token', async () => {
    const auth = await authService.authentication(validAccessToken);
    expect(auth).toEqual(true);
  });

  it('verifies authentication by an invalid access token ', async () => {
    const auth = await authService.authentication(invalidAccessToken);
    expect(auth).toEqual(false);
  });

  it('verifies authorization by a valid access token and valid scope', async () => {
    const auth = await authService.authorization(validAccessToken, validScope);
    expect(auth).toEqual(true);
  });

  it('verifies authorization by a valid access token and invalid scope', async () => {
    const auth = await authService.authorization(
      validAccessToken,
      invalidScope
    );
    expect(auth).toEqual(false);
  });

  it('verifies authorization by an invalid access token and valid scope', async () => {
    const auth = await authService.authorization(
      invalidAccessToken,
      validScope
    );
    expect(auth).toEqual(false);
  });

  it('verifies authorization by an invalid access token and invalid scope', async () => {
    const auth = await authService.authorization(
      invalidAccessToken,
      invalidScope
    );
    expect(auth).toEqual(false);
  });

  it('verifies current user by a valid access token', async () => {
    const { user } = await authService.currentUser(validAccessToken);
    expect(user).toBeDefined();
  });

  it('verifies current user by an invalid access token', async () => {
    const { user } = await authService.currentUser(invalidAccessToken);
    expect(user).toBeUndefined();
  });
});
