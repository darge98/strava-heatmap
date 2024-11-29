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
import {Observable, take, tap} from "rxjs";
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

  columns = ['name', 'type', 'start_date'];

  loading = signal(true);

  private getters: NbGetters<Activity, Activity> = {
    dataGetter: (node: Activity) => node,
    childrenGetter: (node: Activity) => undefined,
    expandedGetter: (node: Activity) => true
  };
  dataSource = this.dataSourceBuilder.create([], this.getters)

  constructor() {
    const accessToken = localStorage.getItem('stravaAccessToken');
    if (!accessToken) {
      this.router.navigate(['login']);
      return;
    }

    this.extractActivities(accessToken).pipe(take(1))
      .subscribe((response: Activity[]) => {
          this.dataSource.setData(response, this.getters);
        }
      )
  }

  private extractActivities(accessToken: string): Observable<any> {
    return this.stravaService.getRecentActivities(accessToken).pipe(
      tap({
        next: (event) => this.loading.set(false),
        error: () => this.loading.set(false)
      })
    );
  }

  // Funzione per visualizzare i dettagli di un'attività
  viewActivity(activityId: number): void {
    this.router.navigate(['/activity', activityId]);
  }
}
