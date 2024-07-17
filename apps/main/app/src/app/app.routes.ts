import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  WebComponentWrapper,
  WebComponentWrapperOptions,
} from '@angular-architects/module-federation-tools';
export const appRoutes: Route[] = [
  {
    path: 'remote',
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'mfe-configuration',
    loadChildren: () =>
      import('./mfe-configuration/mfe-configuration.module').then(
        (m) => m.MFEConfigurationModule
      ),
  },
  {
    path: 'react',
    component: WebComponentWrapper,
    data: {
      type: 'script',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      remoteName: 'reactChild',
      exposedModule: './web-components',
      elementName: 'child-react-element',
    } as WebComponentWrapperOptions,
  },
  {
    path: 'external',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.mjs',
        exposedModule: './ExternalModule',
      }).then((m) => m.RemoteEntryModule),
  },
  {
    path: 'external-feed',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.mjs',
        exposedModule: './ExternalFeedModule',
      }).then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
