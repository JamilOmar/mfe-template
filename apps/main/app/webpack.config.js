const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const mf = require('@angular-architects/module-federation/webpack');
const share = mf.share;
const shareAll = mf.shareAll;
const sharedMappings = new mf.SharedMappings();
const configuration = require('./app.config.js');
const pkgJson = require('./package.json');
const appInfo = { version: pkgJson.version, name: pkgJson.name };
const { FilePlugin } = require('./file-plugin');

module.exports = {
  output: {
    uniqueName: 'app',
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
      name: 'main-app',
      library: { type: 'module' },
      filename: 'remoteEntry.mjs',
      exposes: {
        './RemoteEntryModule':
          'apps/main/app/src/app/remote-entry/entry.module.ts',
      },
      shared: share({
        '@angular/core': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
        },
        '@angular/common': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
        },
        '@angular/common/http': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
        },
        '@angular/router': {
          singleton: true,
          strictVersion: true,
          requiredVersion: 'auto',
          eager: true,
        },
        ...sharedMappings.getDescriptors(),
      }),
    }),
    sharedMappings.getPlugin(),
  ],
};
