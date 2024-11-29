import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StravaService} from "../../../services/strava/strava.service";
import {CommonModule} from "@angular/common";
import {NbCardModule, NbLayoutModule, NbSpinnerModule} from "@nebular/theme";
import {take} from "rxjs";
import {TokenService} from "../../../services/token/token.service";

/**
 * Component that handles the authentication callback from Strava.
 * It processes the authorization code received in the URL and exchanges it for an access token.
 * If successful, it navigates to the dashboard; otherwise, it displays an error message.
 */
@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbSpinnerModule
  ],
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  private route = inject(ActivatedRoute); // Injects the ActivatedRoute service to access route parameters
  private router = inject(Router); // Injects the Router service for navigation
  private stravaService = inject(StravaService); // Injects the StravaService to handle API calls
  private tokenService = inject(TokenService); // Injects the TokenService to manage tokens

  loading = true; // Indicates whether the component is in a loading state
  errorMessage: string | null = null; // Holds any error messages to be displayed

  /**
   * Lifecycle hook that is called after the component has been initialized.
   * It retrieves the authorization code from the route parameters and attempts to exchange it for an access token.
   */
  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code'); // Retrieves the authorization code from the URL

    if (!code) {
      this.errorMessage = 'Codice di autorizzazione mancante.'; // Sets error message if code is missing
      this.loading = false; // Stops loading state
      return;
    }

    this.stravaService.exchangeCodeForToken(code).pipe(
      take(1) // Takes only the first emitted value and completes
    ).subscribe({
      next: (response: any) => {
        this.tokenService.saveToken('stravaAccessToken', response['access_token']); // Saves the access token
        this.router.navigate(['/dashboard']); // Navigates to the dashboard upon successful token retrieval
      },
      error: () => {
        this.errorMessage = 'Errore durante il login con Strava.'; // Sets error message on failure
        this.loading = false; // Stops loading state
      }
    });
  }
}

