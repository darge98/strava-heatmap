import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';
import { StravaService } from '../../services/strava/strava.service';
import { TokenService } from '../../services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  // Intercetta solo le chiamate all'API Strava
  if (!req.url.includes('strava.com')) {
    return next(req);
  }

  // le richieste all'endpoint oauth/token non necessitano di autenticazione
  if (req.url.includes('oauth/token')) {
    return next(req);
  }

  const stravaService = inject(StravaService);
  const tokenService = inject(TokenService);

  if (tokenService.isAccessTokenExpired()) {
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        throw new Error('Nessun refresh token disponibile');
      }

      const response: any = stravaService.refreshToken(refreshToken);
      tokenService.saveAccessToken(response.access_token);
      tokenService.saveRefreshToken(response.refresh_token);
      tokenService.saveExpireAt(response.expires_at);
    } catch (error) {
      console.error('Errore durante il refresh del token:', error);
      throw error;
    }
  }

  const accessToken = tokenService.getAccessToken();
  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return next(modifiedRequest);
};