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
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import { authInterceptor } from './interceptor/http/auth.interceptor';
import { NbEvaIconsModule } from '@nebular/eva-icons';

const provideNebular = (): EnvironmentProviders[] => [
  importProvidersFrom(NbThemeModule.forRoot({ name: 'default' })),
  importProvidersFrom(NbSidebarModule.forRoot()),
  importProvidersFrom(NbLayoutModule),
  importProvidersFrom(NbMenuModule),
  importProvidersFrom(NbButtonModule),
  importProvidersFrom(NbIconModule),
  importProvidersFrom(NbEvaIconsModule)
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideNebular()
  ]
};
