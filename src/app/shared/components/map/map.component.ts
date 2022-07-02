import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'm7-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @Input() latitude!: number;
  @Input() longitude!: number;
  @Input() radians!: number;

  public mapOptions!: google.maps.MapOptions;
  public mapCircle!: google.maps.LatLngLiteral;
  public markerOption: google.maps.MarkerOptions = { draggable: false };

  constructor() {}

  ngOnInit(): void {
    this.loadMap();
  }

  public loadMap(): void {
    this.mapOptions = {
      center: { lat: this.latitude, lng: this.longitude },
    };
    this.mapCircle = { lat: this.latitude, lng: this.longitude };
  }
}
