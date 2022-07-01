import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getVehicles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/posicao/placas`);
  }
}
