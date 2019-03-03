import { Observable, of } from 'rxjs';

import { IPersonStatistics } from '@models/statistics.model';

export function initDB() {}
export function updatePersonAvg() {}
export function getProfileStatistics(): Observable<IPersonStatistics> {
  return of({
    lastSampleAt: new Date(),
    calories: { min: 0, max: 10, average: 5, lastSample: 7 },
    respiratoryRate: { min: 0, max: 10, average: 5, lastSample: 7 },
    spO2: { min: 0, max: 10, average: 5, lastSample: 7 },
    heartRate: { min: 0, max: 10, average: 5, lastSample: 7 },
    hrVariability: { min: 0, max: 10, average: 5, lastSample: 7 },
    systolicBP: { min: 0, max: 10, average: 5, lastSample: 7 },
    diastolicBP: { min: 0, max: 10, average: 5, lastSample: 7 },
    pulsePressure: { min: 0, max: 10, average: 5, lastSample: 7 },
    strokeVolume: { min: 0, max: 10, average: 5, lastSample: 7 },
    cardiacOutput: { min: 0, max: 10, average: 5, lastSample: 7 },
    cardiacIndex: { min: 0, max: 10, average: 5, lastSample: 7 },
    svrTemperature: { min: 0, max: 10, average: 5, lastSample: 7 },
    sweat: { min: 0, max: 10, average: 5, lastSample: 7 },
  });
}
