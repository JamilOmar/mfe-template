import { ClientCredentials, User } from '../common/shared/types';
import { Jsonwebtoken } from './jsonwebtoken';

export class Auth {
  private jsonwebtoken: Jsonwebtoken;

  constructor(clientCredentials: ClientCredentials) {
    this.jsonwebtoken = new Jsonwebtoken(clientCredentials);
  }

  public authentication = async (accessToken: string): Promise<boolean> => {
    return await this.jsonwebtoken.authentication(accessToken);
  };

  public authorization = async (
    accessToken: string,
    scope: string[]
  ): Promise<boolean> => {
    return await this.jsonwebtoken.authorization(accessToken, scope);
  };

  public currentUser = async (accessToken: string): Promise<User> => {
    const res = await this.jsonwebtoken.currentUser(accessToken);

    return { user: res?.data };
  };
}
