import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {NbLayoutModule} from "@nebular/theme";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NbLayoutModule,
  ],
  templateUrl: './app.component.html'
})
export class AppComponent {
}
