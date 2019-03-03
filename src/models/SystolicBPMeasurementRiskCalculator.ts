class SystolicBPMeasurementRiskCalculator extends MeasurementRiskCalculator{

  public systolicBPMRangeScale: RangeScale;

  constructor() {
    super();
    this.systolicBPMRangeScale = {redRange: {low: 141, high: 190},
                                  yellowRange: {low: 121, high: 140},
                                  greenRange: {low: 90, high: 120}};
  }

  calcRisk(): number {
    let risk =  this.calcAberrantPersonalAverage() + this.calcAberrantGeneralAverage(this.systolicBPMRangeScale);

    if (risk > 1) {
      return 1;
    }

    return risk;
  }
}
