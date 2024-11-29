import {Component, inject} from '@angular/core';
import {StravaService} from "../../../services/strava/strava.service";
import {NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule} from "@nebular/theme";

/**
 * LoginComponent is a standalone Angular component responsible for handling
 * user login functionality using Strava authentication.
 *
 * It imports necessary Nebular modules for UI components such as buttons,
 * layout, cards, and icons.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NbButtonModule,
    NbLayoutModule,
    NbCardModule,
    NbIconModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  /**
   * An instance of StravaService used to perform login operations
   * with Strava.
   */
  private stravaService = inject(StravaService);

  /**
   * Initiates the login process with Strava by calling the
   * loginWithStrava method from StravaService.
   */
  loginWithStrava(): void {
    this.stravaService.loginWithStrava();
  }
}

