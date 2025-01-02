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

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private stravaService = inject(StravaService);
  private tokenService = inject(TokenService);

  loading = true;
  errorMessage: string | null = null;

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
      take(1)
    ).subscribe({
      next: (response: any) => {
        this.tokenService.saveAccessToken(response.access_token);
        this.tokenService.saveRefreshToken(response.refresh_token);
        this.tokenService.saveExpireAt(response.expires_at);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = 'Errore durante il login con Strava.';
        console.log(this.errorMessage, err);
        this.loading = false;
      }
    });
  }
}

