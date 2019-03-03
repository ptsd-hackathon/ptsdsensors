abstract class MeasurementRiskCalculator {

  public risk: number = 0;
  public statistic: IPersonStatistic | undefined;

  constructor(private aberrantLevel: number) {}

  //public abstract getGradeInScale(): number;

  public isAberrantPersonalAverage(statistic: IPersonStatistic) {
    return statistic.lastSample < statistic.average - this.aberrantLevel ||
      statistic.lastSample > statistic.average + this.aberrantLevel;
  }

  public isAberrantGeneralAverage(statistic: IPersonStatistic): boolean {
    return true;
  }

  public abstract calcRisk() : number;

  public updateSatistics(newStatistic: IPersonStatistic) {
    this.statistic = newStatistic;
    this.risk = this.calcRisk();
  }
}
