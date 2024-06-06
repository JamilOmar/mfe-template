const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const share = mf.share;
const sharedMappings = new mf.SharedMappings();
const configuration = require('./app.config.js');
const pkgJson = require('./package.json');
const appInfo = { version: pkgJson.version, name: pkgJson.name };
const { FilePlugin } = require('./file-plugin');

module.exports = {
  output: {
    uniqueName: 'demo',
    publicPath: 'auto',
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    },
  },
  plugins: [
    new FilePlugin({
      outputFile: 'app.json',
      content: configuration ? JSON.stringify(configuration) : '{}',
    }),
    new FilePlugin({
      outputFile: 'version.json',
      content: appInfo ? JSON.stringify(appInfo) : '{}',
    }),
    new ModuleFederationPlugin({
      name: 'demo',
      library: { type: 'module' },
      filename: 'remoteEntry.mjs',
      exposes: {
        './RemoteEntryModule':
          'apps/main/app/src/app/remote-entry/entry.module.ts',
      },
      shared: share({
        '@angular/core': { singleton: true, strictVersion: false },
        '@angular/common': { singleton: true, strictVersion: false },
        '@angular/common/http': { singleton: true, strictVersion: false },
        '@angular/router': { singleton: true, strictVersion: false },
        lodash: { singleton: true, strictVersion: false },
        '@axleresearch/hits-base-ui': { singleton: true, strictVersion: false },
        'angular-auth-oidc-client': { singleton: true, strictVersion: false },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
