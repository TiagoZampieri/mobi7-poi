import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { finalize, take } from 'rxjs';
import { POI } from 'src/app/models/poi.model';
import { Position } from 'src/app/models/position.model';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';
import { PositionService } from '../../services/position/position.service';
import { VehicleService } from '../../services/vehicle/vehicle.service';

@Component({
  selector: 'm7-poi',
  templateUrl: './poi.component.html',
  styleUrls: ['./poi.component.scss'],
})
export class PoiComponent implements OnInit {
  @Input() poi!: POI;
  public vehicles!: string[];
  public positions!: Position[];
  public filterForm!: FormGroup;
  public isLoadingVehicles = true;
  public isLoadingPositions!: boolean;
  constructor(
    private vehicleService: VehicleService,
    private positionService: PositionService,
    private formBuilder: FormBuilder,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.filterForm = this.buildForm();
    this.getVehicles();
  }

  private getVehicles(): void {
    this.vehicleService
      .getVehicles()
      .pipe(
        take(1),
        finalize(() => (this.isLoadingVehicles = false))
      )
      .subscribe({
        next: (response) => {
          this.vehicles = response;
        },
      });
  }

  private getPositions(vehicle: string, date: string): void {
    this.isLoadingPositions = true;
    this.positionService
      .getPositions(vehicle, date)
      .pipe(
        take(1),
        finalize(() => (this.isLoadingPositions = false))
      )
      .subscribe({
        next: (response) => {
          this.positions = response.filter(
            (position) =>
              this.utils.calculateRadians(
                this.poi.latitude,
                this.poi.longitude,
                position.latitude,
                position.longitude
              ) <=
              this.poi.raio / 1000
          );
        },
      });
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      vehicle: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
    });
  }

  private get vehicleControl(): AbstractControl | null {
    return this.filterForm.get('vehicle');
  }

  private get dateControl(): AbstractControl | null {
    return this.filterForm.get('date');
  }

  public filterPositions(): void {
    const dateFromatted = this.utils.formatDate(this.dateControl?.value);
    this.getPositions(this.vehicleControl?.value, dateFromatted);
  }
}
