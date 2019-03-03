interface IPersonStatistics {
    lastSampleAt: Date;
    caloriesMovement: IPersonStatistic;
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
    Sweat: IPersonStatistic;
}

interface IPersonStatistic {
    min: number;
    max: number;
    average: number;
    lastSample: number;
}