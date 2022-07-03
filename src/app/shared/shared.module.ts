import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { GoogleMapsModule } from '@angular/google-maps';
import { MapComponent } from './components/map/map.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [MapComponent],
  imports: [CommonModule, GoogleMapsModule],
  exports: [
    MatExpansionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    GoogleMapsModule,
    MapComponent,
    FlexLayoutModule,
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
