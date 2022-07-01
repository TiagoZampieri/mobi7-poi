import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { take } from 'rxjs';
import { POI } from 'src/app/models/poi.model';
import { PoiService } from '../services/poi/poi.service';

@Component({
  selector: 'm7-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('sidenav') private sidenav!: MatSidenav;
  public pois: POI[] = [];
  public selectedPoi!: POI | null;
  constructor(private poiService: PoiService) {}

  ngOnInit(): void {
    this.getPois();
  }

  public openSidenav(poi: POI): void {
    this.selectedPoi = poi;
    this.sidenav.open();
  }

  private getPois(): void {
    this.poiService
      .getPois()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.pois = response;
        },
      });
  }

  public clearSelectedPoi(): void {
    this.selectedPoi = null;
  }
}
