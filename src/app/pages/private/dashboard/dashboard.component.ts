import {Component, inject, signal} from '@angular/core';
import {StravaService} from "../../../services/strava/strava.service";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {
  NbCardModule,
  NbGetters,
  NbLayoutModule,
  NbSpinnerModule,
  NbTreeGridDataSourceBuilder,
  NbTreeGridModule
} from "@nebular/theme";
import {take} from "rxjs";
import {Activity} from "../../../services/strava/activity";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    NbTreeGridModule,
    NbSpinnerModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private stravaService = inject(StravaService);
  private router = inject(Router);
  private dataSourceBuilder = inject(NbTreeGridDataSourceBuilder<any>);

  readonly columns: ReadonlyArray<string> = ['name', 'type', 'start_date'];
  readonly loading = signal(true);

  private getters: NbGetters<Activity, Activity> = {
    dataGetter: (node: Activity) => node,
    childrenGetter: (_: Activity) => undefined,
    expandedGetter: (_: Activity) => true
  };
  dataSource = this.dataSourceBuilder.create([], this.getters)

  constructor() {
    const accessToken = localStorage.getItem('stravaAccessToken');
    if (!accessToken) {
      this.router.navigate(['login']);
      return;
    }

    this.stravaService.getRecentActivities(accessToken).pipe(take(1))
      .subscribe({
        next: data => {
          this.dataSource.setData(data, this.getters);
        },
        error: error => {
        },
        complete: () => this.loading.set(false)
      })
  }

  // Funzione per visualizzare i dettagli di un'attività
  viewActivity(row: any): void {
    if (!row?.data['id']) {
      return;
    }
    this.router.navigate(['/activity', row?.data['id']]);
  }
}
