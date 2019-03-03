import { timer, Observable, of } from "rxjs";
import { flatMap, delay } from 'rxjs/operators';
import { randomBetween } from "./utils";

import { IWatchStatisticsSample } from "../models/watch.model";
import { getUsers, updatePersonAvg } from "./mongodb.controller";

export function initDataRetriever(intervalTime: number): void {
    timer(intervalTime, 0).pipe(
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
        spO2: randomBetween(1, 10),
        heartRate: randomBetween(1, 10),
        hrVariability: randomBetween(1, 10),
        systolicBP: randomBetween(1, 10),
        diastolicBP: randomBetween(1, 10),
        pulsePressure: randomBetween(1, 10),
        strokeVolume: randomBetween(1, 10),
        cardiacOutput: randomBetween(1, 10),
        cardiacIndex: randomBetween(1, 10),
        svrTemperature: randomBetween(1, 10),
        sweat: randomBetween(1, 10)
    }))).pipe(
        delay(300)
    );
}