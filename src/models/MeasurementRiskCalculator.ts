abstract class MeasurementRiskCalculator {

  readonly GREEN_RISK_LEVEL = 0;
  readonly YELLOW_RISK_LEVEL = 0.2;
  readonly PERSONAL_LIMIT_PASS_RISK = 0.5;

  public risk: number = 0;
  public statistic: IPersonStatistic;

  constructor() {
    this.statistic = {min: 0, max: 0, average: 0, lastSample: 0};
  }


  public calcAberrantPersonalAverage(): number {
    let lastSample = this.statistic.lastSample;

    if (lastSample > this.statistic.max || lastSample < this.statistic.min) {
      return this.PERSONAL_LIMIT_PASS_RISK;
    }

    let greaterDeviation = Math.max(Math.abs(lastSample - this.statistic.max), Math.abs(lastSample - this.statistic.min));
    return Math.abs(lastSample - this.statistic.average) / greaterDeviation;
  }

  public calcAberrantGeneralAverage(rangeScale: RangeScale): number {

    let lastSample = this.statistic.lastSample;

    if (lastSample >= rangeScale.greenRange.low && lastSample <= rangeScale.greenRange.high) {
      return this.GREEN_RISK_LEVEL;
    }
    else if(lastSample > rangeScale.yellowRange.low && lastSample <= rangeScale.yellowRange.high) {
      return this.YELLOW_RISK_LEVEL;
    }
    else {
      return this.calcRedRisk(lastSample, rangeScale);
    }
  }

  public calcRedRisk(lastSample: number, rangeScale: RangeScale) {
    return Math.abs(lastSample - rangeScale.greenRange.high) * 0.01;
  }

  public abstract calcRisk() : number;

  public updateSatistics(newStatistic: IPersonStatistic) {
    this.statistic = newStatistic;
    this.risk = this.calcRisk();
  }
}
