import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "../services/token/token.service";

/**
 * Guard that checks for the presence of an access token.
 *
 * This function implements the CanActivate interface to determine
 * if a route can be activated based on the existence of a Strava
 * access token. If the token is found, the user is redirected to
 * the login page and access is denied. If the token is not found,
 * access is granted.
 *
 * @param route - The activated route that is being checked.
 * @param state - The router state that is being checked.
 * @returns A boolean indicating whether the route can be activated.
 */
export const hasAccessTokenGuard: CanActivateFn = (route, state) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  if (!tokenService.getToken('stravaAccessToken')) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};

