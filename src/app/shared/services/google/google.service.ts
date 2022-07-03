import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private mapsApiKey = environment.mapsApiKey;
  constructor(private http: HttpClient) {}

  public loadMapsApi(): Observable<Object> {
    return this.http.jsonp(
      `https://maps.googleapis.com/maps/api/js?key=${this.mapsApiKey}`,
      'callback'
    );
  }
}
