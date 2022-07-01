import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  public formatDate(date: Date): string {
    const dateDayJS = dayjs(date);
    const day = dateDayJS.get('D');
    const month = dateDayJS.get('M') + 1;
    const year = dateDayJS.get('y');
    const formatted = `${month}/${day}/${year}`;
    return formatted;
  }

  public calculateRadians(
    latPOI: number,
    longPOI: number,
    latPosition: number,
    longPosition: number
  ): number {
    const distance =
      6371 *
      Math.acos(
        Math.cos((Math.PI * (90 - latPosition)) / 180) *
          Math.cos(((90 - latPOI) * Math.PI) / 180) +
          Math.sin(((90 - latPosition) * Math.PI) / 180) *
            Math.sin(((90 - latPOI) * Math.PI) / 180) *
            Math.cos(((longPOI - longPosition) * Math.PI) / 180)
      );
    return distance;
  }
}
