import { MeasurementRiskCalculator } from "@models/MeasurementRiskCalculator";
import { RangeScale } from "@models/range.model";

export class HeartRateMeasurmentRiskCalculator extends MeasurementRiskCalculator{

  public heartRateScale: RangeScale;
  constructor() {
    super();
    this.heartRateScale = {redRange: {high: 85, low: 75}, yellowRange: {high: 74, low: 65}, greenRange: {high: 64, low: 60}}};
  calcRisk(): number {
    return this.calcAberrantGeneralAverage(this.heartRateScale) + this.calcAberrantPersonalAverage();
  }

  getMeasurementName(): string {
    return "Hearte Rate";
  }

}
