import { MeasurementRiskCalculator } from "@models/MeasurementRiskCalculator";
import { RangeScale } from "@models/range.model";

export class HeartRateVariabilityMeasurementRiskCalculator extends MeasurementRiskCalculator {

  public HRV4SecondsScale: RangeScale;
  constructor() {
    super();
    this.HRV4SecondsScale = {greenRange: {low: 5, high: 7}, yellowRange: {low: 3, high: 4}, redRange: {low: 1, high: 2}};
  }
  
  calcRisk(): number {
    let risk = this.calcAberrantGeneralAverage(this.HRV4SecondsScale) + this.calcAberrantPersonalAverage();
    
    if (risk > 1) {
      return 1;
    } 
    
    return 1;
  }

  getMeasurementName(): string {
    return "Heart Rate Variability";
  }
}
