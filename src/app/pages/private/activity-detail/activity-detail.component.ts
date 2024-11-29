import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {StravaService} from "../../../services/strava/strava.service";
import {CommonModule, DatePipe, DecimalPipe} from "@angular/common";
import {NbCardModule, NbLayoutModule} from "@nebular/theme";
import {ElapsedTimePipe} from "../../../pipes/elapsed-time.pipe";
import * as L from 'leaflet';
import 'leaflet.heat';

@Component({
  selector: 'app-activity-detail',
  standalone: true,
  imports: [
    DatePipe,
    DecimalPipe,
    CommonModule,
    NbLayoutModule,
    NbCardModule,
    ElapsedTimePipe
  ],
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.scss']
})
export class ActivityDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private stravaService = inject(StravaService);

  activity: any;
  loading = true;
  errorMessage: string | null = null;
  private map: any;

  ngOnInit(): void {
    const activityId = +this.route.snapshot.paramMap.get('id')!;
    const accessToken = localStorage.getItem('stravaAccessToken');

    if (accessToken) {
      // Recupera i dettagli dell'attività
      this.stravaService.getActivityById(accessToken, activityId).subscribe({
        next: (response) => {
          this.activity = response;
          this.loading = false;
          this.loadHeatmap();
        },
        error: (error) => {
          this.errorMessage = 'Errore durante il recupero dei dettagli dell\'attività.';
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'Token di accesso non trovato.';
      this.loading = false;
    }
  }

  // Funzione per caricare e visualizzare la heatmap
  loadHeatmap(): void {
    const routePolyline = this.activity.map.polyline;

    const decodedRoute = this.decodePolyline(routePolyline);

    this.map = L.map('heatmap').setView([decodedRoute[0][0], decodedRoute[0][1]], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    const heatmapPoints = decodedRoute.map((point: any) => [point[0], point[1], 0.5]);  // 0.5 è l'intensità della heatmap

    L.heatLayer(heatmapPoints as any, {radius: 10, blur: 15, maxZoom: 17}).addTo(this.map);
  }

  // Funzione per decodificare la polilinea (Strava usa il formato encoded polyline)
  decodePolyline(encoded: string): any[] {
    let points = [];
    let index = 0;
    let lat = 0;
    let lng = 0;

    while (index < encoded.length) {
      let result = 0;
      let shift = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      result = 0;
      shift = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push([lat / 1e5, lng / 1e5]);
    }
    return points;
  }
}
