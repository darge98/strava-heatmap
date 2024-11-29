import {Routes} from '@angular/router';
import {LoginComponent} from "./pages/public/login/login.component";
import {DashboardComponent} from "./pages/private/dashboard/dashboard.component";
import {AuthCallbackComponent} from "./pages/public/auth-callback/auth-callback.component";
import {ActivityDetailComponent} from "./pages/private/activity-detail/activity-detail.component";
import {hasAccessTokenGuard} from "./guards/has-access-token.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'auth-callback', component: AuthCallbackComponent},
  {
    path: '', canActivate: [hasAccessTokenGuard], children: [
      {path: 'activity/:id', component: ActivityDetailComponent},
      {path: 'dashboard', component: DashboardComponent},
    ]
  }
];
