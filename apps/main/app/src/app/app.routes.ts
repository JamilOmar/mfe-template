import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
export const appRoutes: Route[] = [
  {
    path: 'remote',
    loadChildren: () =>
      import('./remote-entry/entry.module').then((m) => m.RemoteEntryModule),
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
