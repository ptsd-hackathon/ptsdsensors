export interface IPersonStatistics {
  userId: String;
  count?: number;
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
  svr: IPersonStatistic;
  temperature: IPersonStatistic;
  sweat: IPersonStatistic;
}

export interface IPersonStatistic {
  min: number;
  max: number;
  average: number;
  lastSample: number;
}
