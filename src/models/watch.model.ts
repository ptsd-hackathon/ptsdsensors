export interface IWatchStatisticsSample {
  userId: string;
  date: Date;
  calories: number;
  respiratoryRate: number;
  spO2: number;
  heartRate: number;
  hrVariability: number;
  systolicBP: number;
  diastolicBP: number;
  pulsePressure: number;
  strokeVolume: number;
  cardiacOutput: number;
  cardiacIndex: number;
  svr: number;
  temperature: number;
  sweat: number;
}
