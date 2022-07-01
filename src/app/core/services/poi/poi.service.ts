import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { POI } from 'src/app/models/poi.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PoiService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getPois(): Observable<POI[]> {
    return this.http.get<POI[]>(`${this.apiUrl}/pois`);
  }
}
