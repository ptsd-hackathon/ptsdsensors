import { Observable, of, interval } from "rxjs";
import { flatMap, delay, tap } from 'rxjs/operators';
import { randomBetween } from "./utils";

import { IWatchStatisticsSample } from "../models/watch.model";
import { getUsers, updatePersonAvg } from "./mongodb.controller";

export function initDataRetriever(intervalTime: number): void {
    interval(intervalTime).pipe(
        flatMap(() => getUsers()),
        flatMap(users => getWatchStatistics(users))
    ).subscribe(
        stats => {
            stats.forEach(userStats => {
                updatePersonAvg(userStats);
            });
        }
    );
}

export function getWatchStatistics(users: { userId: string }[]): Observable<IWatchStatisticsSample[]> {
    return of(users.map(user => ({
        userId: user.userId,
        date: new Date(),
        calories: randomBetween(23, 63),
        respiratoryRate: randomBetween(10, 20),
        spO2: randomBetween(80, 110),
        heartRate: randomBetween(70, 90),
        hrVariability: randomBetween(1, 12),
        systolicBP: randomBetween(120, 135),
        diastolicBP: randomBetween(80, 90),
        pulsePressure: randomBetween(40, 50),
        strokeVolume: randomBetween(75, 90),
        cardiacOutput: randomBetween(5, 10),
        cardiacIndex: randomBetween(3, 7),
        svr: randomBetween(900, 1100),
        temperature: randomBetween(35, 43),
        sweat: randomBetween(1, 2)
    }))).pipe(
        delay(300)
    );
}