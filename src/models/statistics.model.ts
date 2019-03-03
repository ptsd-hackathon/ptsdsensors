export interface IPersonStatistics {
    lastSampleAt: Date;
    calories: IPersonStatistic;
    respiratoryRate: IPersonStatistic;
    spO2: IPersonStatistic;
    heartRate: IPersonStatistic;
    hrVariability: IPersonStatistic;
    systolicBP: IPersonStatistic;
    diastolicBP: IPersonStatistic;
    pulsePressure: IPersonStatistic;
    strokeVolume: IPersonStatistic;
    cardiacOutput: IPersonStatistic;
    cardiacIndex: IPersonStatistic;
    svrTemperature: IPersonStatistic;
    sweat: IPersonStatistic;
}

interface IPersonStatistic {
    min: number;
    max: number;
    average: number;
    lastSample: number;
}