import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/models/position.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  public getPositions(vehicle?: string, date?: string): Observable<Position[]> {
    return this.http.get<Position[]>(
      `${this.apiUrl}/posicao?placa=${vehicle}&data=${date}`
    );
  }
}
