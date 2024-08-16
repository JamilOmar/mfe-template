# auth-api

## Validation of Authentication, Authorization and Current User via Access Token

This library was generated with [Nx](https://nx.dev).

Auth-Api is a NestJs library token validation of:

- Authentication
- Authorization
- Current User

## Features

- A [Guard](https://docs.nestjs.com/guards) to validate the access token.
- A [Decorator](https://docs.nestjs.com/custom-decorators#custom-route-decorators) to specify the autorization scope.
- A [Decorator](https://docs.nestjs.com/custom-decorators#custom-route-decorators) to obtain the current user.
- A [Module](https://docs.nestjs.com/modules) to configure the provider to implement.

## Installation

To begin using it, we first install the required dependency.

```sh
npm i --save @jamilomar/auth-api
```

## Getting started

Once the installation process is complete, to use the auth-api, first import auth-api into the root `app.module`

```ts
import { Module } from '@nestjs/common';
import { AuthApiModule } from '@jamilomar/auth-api';
@Module({
  imports: [
    AuthApiModule.forRoot({
      scope: 'permissions_example',
      audience: 'https://test.com',
      issuer: 'https://example.com',
      jwksUri: 'https://example.com/.well-known/jwks.json',
      idTokenUrl: 'https://example.com/userinfo',
      jwksCache: true,
      jwksRateLimit: true,
      jwksRequestPerTime: 5,
      separator: ' ',
    }),
  ],
})
export class AppModule {}
```

or

```ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthApiModule } from '@jamilomar/auth-api';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthApiModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('credentials'),
    }),
  ],
})
export class AppModule {}
```

For the forRootAsync(), you need to add in the config file in your application the `credentials` property with this
data.

```
credentials: {
  scope: 'permissions_example',
  audience: 'https://test.com',
  issuer: 'https://example.com',
  jwksUri: 'https://example.com/.well-known/jwks.json',
  idTokenUrl: 'https://example.com/userinfo',
  jwksCache: true,
  jwksRateLimit: true,
  jwksRequestPerTime: 5,
  separator: ' ',
},

```

The forRoot() and forRootAsync() method supports all the configuration properties which are supply by the provider
(auth0, b2c, etc).

Then, import the Guard and Decorators into your controller (`users.controller`).

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Auth, CurrentUser } from '@jamilomar/auth-api';

@UseGuards(AuthGuard)
@Controller()
export class UsersController {
  constructor() {}
  @Auth({ permissions: ['read:documents', 'create:documents'] })
  @Get()
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
```

`@UseGuards(AuthGuard)` is working as controller-scoped.
`@Auth({ permissions: ['read:documents', 'create:documents'] })` is working as method-scoped and also with resticted
scope. In this case there are two scopes, but it can be an string-array as long as you need it. This validation method
is called as `Authorization` (token and scope validations). If you leave an empty array, it will not validate the token.

Alternatively, if you prefer to use Auth without scope, you can leave it blank.

```ts
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard, Auth, CurrentUser } from '@jamilomar/auth-api';
@UseGuards(TokenGuard)
@Controller()
export class UsersController {
  constructor() {}
  @Auth()
  @Get()
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
```

This alternative option will only validate the token regardless of the scope and it is called as `Authentication` (only
token validation).

Depending on the validation of the token, the responses can be one of these 2 types:

1. Forbidden resource: This means that the token/scope is not validate.

```sh
{
    "statusCode": 403,
    "message": "Forbidden resource",
    "error": "Forbidden"
}
```

2. Data requered (in this case the current user information).

```sh
{
  user: {
    sub: 'fwfwek39843hf344',
    nickname: 'example_nickname',
    name: 'example',
    updated_at: '2022-08-08T13:47:34.403Z',
    email: 'example@example.com',
    email_verified: true
  }
}
```

##### Note:

For proper operation on decorators, the Guard must be executed.

## Build

Run `pnpm nx run auth-api:build` to execute the build

## Running unit tests

Run `pnpm nx run auth-api:test` to execute the unit tests via [Jest](https://jestjs.io).
