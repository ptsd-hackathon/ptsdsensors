import { MeasurementRiskCalculator } from "@models/MeasurementRiskCalculator";

export class DiastolicBPMeasurementRiskCalculator extends MeasurementRiskCalculator{

  public systolicBPMRangeScale: RangeScale;

  constructor() {
    super();
    this.systolicBPMRangeScale = {redRange: {low: 90, high: 100},
                                  yellowRange: {low: 80, high: 89},
                                  greenRange: {low: 60, high: 79}};
  }

  calcRisk(): number {
    let risk =  this.calcAberrantPersonalAverage() + this.calcAberrantGeneralAverage(this.systolicBPMRangeScale);

    if (risk > 1) {
      return 1;
    }

    return risk;
  }

  public getMeasurementName() {
    return "diastolic blood pressure";
  }
}
