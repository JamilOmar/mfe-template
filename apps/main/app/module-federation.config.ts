import { ModuleFederationConfig } from '@nx/webpack';

const config: ModuleFederationConfig = {
  name: 'main-app',
  exposes: {
    './RemoteEntryModule':
    'apps/main/app/src/app/remote-entry/entry.module.ts',
  },
};

export default config;