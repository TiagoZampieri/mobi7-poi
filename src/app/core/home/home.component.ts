import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {
  catchError,
  finalize,
  firstValueFrom,
  lastValueFrom,
  map,
  of,
  take,
} from 'rxjs';
import { POI } from 'src/app/models/poi.model';
import { PoiService } from '../services/poi/poi.service';

@Component({
  selector: 'm7-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') private sidenav!: MatSidenav;
  public apiLoaded!: boolean;
  public pois: POI[] = [];
  public selectedPoi!: POI | null;
  public mapOptions!: google.maps.MapOptions;
  public mapCircle!: google.maps.LatLngLiteral;
  public markerOption: google.maps.MarkerOptions = { draggable: false };
  public isLoading = true;
  constructor(private poiService: PoiService, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGoogleMapsAPI();
    this.getPois();
  }

  public openSidenav(poi: POI): void {
    this.selectedPoi = poi;
    this.sidenav.open();
  }

  private async loadGoogleMapsAPI(): Promise<void> {
    this.apiLoaded = await firstValueFrom(
      this.http
        .jsonp(
          'https://maps.googleapis.com/maps/api/js?key=AIzaSyBmXXnI-ilPbwFMtEqR_oo53jAPTAVy5IQ',
          'callback'
        )
        .pipe(
          map(() => true),
          catchError(() => of(false))
        )
    );
  }

  private getPois(): void {
    this.poiService
      .getPois()
      .pipe(
        take(1),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.pois = response;
        },
      });
  }

  public clearSelectedPoi(): void {
    this.selectedPoi = null;
  }

  public loadPoiMap(poi: POI): void {
    this.mapOptions = {
      center: { lat: poi.latitude, lng: poi.longitude },
    };
    this.mapCircle = { lat: poi.latitude, lng: poi.longitude };
  }
}
