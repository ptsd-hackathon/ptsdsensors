import {MeasurementRiskCalculator} from "./MeasurementRiskCalculator";

export interface ICombinedRisk {
  statistics: MeasurementRiskCalculator [];
  relationshipStrength: number;
  risk: number;
}
