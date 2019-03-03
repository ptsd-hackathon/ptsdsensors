import {ICombinedRisk} from "../models/ICombinedRisk";
import {MeasurementRiskCalculator} from "../models/MeasurementRiskCalculator";
import {IPersonStatistics} from "../models/statistics.model";
import {SystolicBPMeasurementRiskCalculator} from "../models/SystolicBPMeasurementRiskCalculator";

export class CombinedRiskCalculator {

  private static getCombinedRisk(measurementsCalculators: MeasurementRiskCalculator[], strength: number):ICombinedRisk
  {
    let riskCombined: number = strength;
    for (const calculator of measurementsCalculators)
    {
      riskCombined *= calculator.risk;
    }

    return {
      relationshipStrength: 0,
      risk: riskCombined,
      statistics: measurementsCalculators
    };
  }

  private personStatistics: IPersonStatistics;
  private systolicBPCalculator: SystolicBPMeasurementRiskCalculator;

  constructor(personStatistics: IPersonStatistics){
    this.personStatistics = personStatistics;
    this.systolicBPCalculator = new SystolicBPMeasurementRiskCalculator(0);
    this.systolicBPCalculator.statistic = this.personStatistics.systolicBP;
  }
  public CalculateCombinedRisk(personStatistics: IPersonStatistics): ICombinedRisk[]
  {
    const allRisks: ICombinedRisk[] = [];
    this.personStatistics = personStatistics;

    allRisks.push(CombinedRiskCalculator.getCombinedRisk([this.systolicBPCalculator, this.systolicBPCalculator], 1));
    allRisks.push(CombinedRiskCalculator.getCombinedRisk([this.systolicBPCalculator, this.systolicBPCalculator], 1.5));
    allRisks.push(CombinedRiskCalculator.getCombinedRisk([this.systolicBPCalculator, this.systolicBPCalculator], 0.7));

    return allRisks;
  }

  public updateStatistics(personStatistics: IPersonStatistics){
    this.systolicBPCalculator.updateSatistics(personStatistics.systolicBP);
  }
}
