import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for interacting with the Strava API.
 * This service handles authentication and fetching activities from the Strava platform.
 */
export class StravaService {
  private http = inject(HttpClient);

  private stravaApiUrl = 'https://www.strava.com/api/v3';
  private stravaAuthUrl = 'https://www.strava.com/oauth/authorize';
  private stravaTokenUrl = 'https://www.strava.com/oauth/token';
  private clientId: string = environment.clientId || '';
  private clientSecret: string = environment.clientSecret || '';
  private redirectUri: string = environment.redirectUri || '';

  /**
   * Redirects the user to Strava's authorization page to log in and authorize the application.
   */
  loginWithStrava(): void {
    // Reindirizza l'utente a Strava per autorizzare l'app
    window.location.href = `${this.stravaAuthUrl}?client_id=${this.clientId}&response_type=code&redirect_uri=${this.redirectUri}&scope=read,activity:read`;
  }

  /**
   * Exchanges the authorization code for an access token.
   *
   * @param code - The authorization code received from Strava after user authorization.
   * @returns An observable containing the response from the Strava token endpoint.
   */
  exchangeCodeForToken(code: string) {
    const body = new HttpParams()
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret)
      .set('code', code)
      .set('grant_type', 'authorization_code')
      .set('redirect_uri', this.redirectUri);

    return this.http.post(this.stravaTokenUrl, body.toString(), {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    });
  }

  /**
   * Aggiorna il token Strava usando il refresh token
   * @param refreshToken - Il refresh token salvato precedentemente
   */
  refreshToken(refreshToken: string) {
    const params = {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    return this.http.post<unknown>(
      this.stravaTokenUrl,
      params
    );
  }

  /**
   * Fetches the recent activities of the authenticated athlete.
   *
   * @returns An observable containing an array of recent activities.
   */
  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.stravaApiUrl}/athlete/activities`);
  }

  /**
   * Fetches a specific activity by its ID.
   *
   * @param activityId - The ID of the activity to retrieve.
   * @returns An observable containing the details of the specified activity.
   */
  getActivityById(activityId: number): Observable<any> {
    return this.http.get<any>(`${this.stravaApiUrl}/activities/${activityId}`);
  }
}
