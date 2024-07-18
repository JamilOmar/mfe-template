# ConfigService

A service that helps you to have configuration as a feature for your project.

## Overview

This service will get the configuration injected from the bootstraping.

## Setup

At app.module.ts or your main angular module you will need to add:

```ts
 providers: [
    { provide:APP_CONF , useValue: environment },
   ],
```

Where `APP_CONF` is an injector Key that will inject the configuration value into the ConfigurationService. You can use
`userValue` to define a source (json, environment , class) for the configuration. By default, it gets created at the
`BaseUIServicesModule.forRoot` method.

## Methods

- load: Defines the configuration.

```ts
this.configuration.load({});
```

- get: Retrieves the configuration value using the key.

```ts
this.configuration.get('TEST', { test: 1 });
this.configuration.get<string>('name', 'john');
```

Optionally, you can send a default value if the value with the given key does not exists.

```ts
this.configuration.get('TEST', { test: 1 }, { test: 0 });
```

- has: Checks if the configuration contains a value with the given key.

```ts
this.configuration.has('TEST');
```

- set: Adds new configuration values.

```ts
this.configuration.set('TEST', { test: 1 });
```

### Example Usage

At the environments/environment.ts

```ts
export const environment = {
  production: true,
  appType: 'electron',
  auth: {
    responseType: 'code id_token',
    url: 'http://localhost:7000/_api',
    clientId: 'VALUE',
    clientSecret: 'VALUE',
    redirectUrl: 'http://localhost:4200',
    tenant: 'ls',
  },
};
```

Adding the configuration at the module

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UIRouterModule, UIRouter } from '@uirouter/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxCoreModule, ConfigService } from '@labshare/ngx-core';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    // load NgxCore
    // Adding environment config
    BaseUIServicesModule.forRoot({
      appConf: environment, // or APPConf
      appType: 'site',
      appBuildVersion: '001',
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

At the component:

```ts
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor(private config: ConfigService) {}

  ngOnInit() {
    this.config.get('TEST');
  }
}
```
