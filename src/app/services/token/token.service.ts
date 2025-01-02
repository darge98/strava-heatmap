import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  public static readonly ACCESS_TOKEN_KEY = 'strava_access_token';
  public static readonly REFRESH_TOKEN_KEY = 'strava_refresh_token';
  public static readonly EXPIRE_AT_KEY = 'strava_expire_at';

  public saveAccessToken(accessToken: string) {
    this.saveToken(TokenService.ACCESS_TOKEN_KEY, accessToken);
  }

  public saveRefreshToken(refreshToken: string) {
    this.saveToken(TokenService.REFRESH_TOKEN_KEY, refreshToken);
  }

  public saveExpireAt(expiresAt: string) {
    this.saveToken(TokenService.EXPIRE_AT_KEY, expiresAt);
  }

  public getAccessToken() {
    return this.getToken(TokenService.ACCESS_TOKEN_KEY);
  }

  public getRefreshToken() {
    return this.getToken(TokenService.REFRESH_TOKEN_KEY);
  }

  public getExpireAt() {
    return this.getToken(TokenService.EXPIRE_AT_KEY);
  }

  public hasAccessToken() {
    return this.hasToken(TokenService.ACCESS_TOKEN_KEY);
  }

  private saveToken(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getToken(key: string) {
    return localStorage.getItem(key);
  }

  private hasToken(key: string) {
    return localStorage.getItem(key) != null;
  }

  isAccessTokenExpired(): boolean {
    const expiresAt = this.getExpireAt();
    if (!expiresAt) {
      return true;
    }

    const expirationTime = parseInt(expiresAt) * 1000; // Converti in millisecondi
    const currentTime = Date.now();
    
    return currentTime >= (expirationTime - 60000);
  }
}
