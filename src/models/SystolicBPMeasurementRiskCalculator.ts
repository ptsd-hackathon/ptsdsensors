class SystolicBPMeasurementRiskCalculator extends MeasurementRiskCalculator{

  constructor(aberrantLevel: number) {
    super(aberrantLevel);
  }
  protected redRange :Range = {low: 141, high: 190};
  protected yellowRange :Range = {low: 121, high: 140};
  protected greenRange :Range = {low: 90, high: 120};

  public getGradeInScale(statistic: IPersonStatistic): number{
    this.isAberrantPersonalAverage(statistic);
    return MeasurmentScale.GREEN;
  }

  calcRisk(): number {
    return 0;
  }


}
