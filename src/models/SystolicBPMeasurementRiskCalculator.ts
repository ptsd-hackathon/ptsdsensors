import { MeasurementRiskCalculator } from "./MeasurementRiskCalculator";
import {RangeScale} from "./range.model";

export class SystolicBPMeasurementRiskCalculator extends MeasurementRiskCalculator{

  public systolicBPMRangeScale: RangeScale;

  constructor() {
    super();
    this.systolicBPMRangeScale = {greenRange: {low: 90, high: 120},
                                  redRange: {low: 141, high: 190},
                                  yellowRange: {low: 121, high: 140}};
  }

  public calcRisk(): number {
    const risk =  this.calcAberrantPersonalAverage() + this.calcAberrantGeneralAverage(this.systolicBPMRangeScale);

    if (risk > 1) {
      return 1;
    }

    return risk;
  }

  public getMeasurementName() {
    return "Systolic blood pressure";
  }
}
