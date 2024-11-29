import {ApplicationConfig, EnvironmentProviders, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule
} from "@nebular/theme";
import {provideHttpClient} from "@angular/common/http";

const provideNebular = (): EnvironmentProviders[] => [
  importProvidersFrom(NbThemeModule.forRoot({ name: 'default' })),
  importProvidersFrom(NbSidebarModule.forRoot()),
  importProvidersFrom(NbLayoutModule),
  importProvidersFrom(NbMenuModule),
  importProvidersFrom(NbButtonModule),
  importProvidersFrom(NbIconModule)
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideNebular()
  ]
};
