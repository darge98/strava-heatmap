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
   * Fetches the recent activities of the authenticated athlete.
   *
   * @param accessToken - The access token for authenticating the request.
   * @returns An observable containing an array of recent activities.
   */
  getRecentActivities(accessToken: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.stravaApiUrl}/athlete/activities`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`),
    });
  }

  /**
   * Fetches a specific activity by its ID.
   *
   * @param accessToken - The access token for authenticating the request.
   * @param activityId - The ID of the activity to retrieve.
   * @returns An observable containing the details of the specified activity.
   */
  getActivityById(accessToken: string, activityId: number): Observable<any> {
    return this.http.get<any>(`${this.stravaApiUrl}/activities/${activityId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${accessToken}`),
    });
  }
}
