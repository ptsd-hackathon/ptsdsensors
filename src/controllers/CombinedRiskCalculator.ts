import {DiastolicBPMeasurementRiskCalculator} from "../models/DiastolicBPMeasurementRiskCalculator";
import {ICombinedRisk} from "../models/ICombinedRisk";
import {MeasurementRiskCalculator} from "../models/MeasurementRiskCalculator";
import {IMeasurement, IRisk} from "../models/risk.model";
import {IPersonStatistics} from "../models/statistics.model";
import {SystolicBPMeasurementRiskCalculator} from "../models/SystolicBPMeasurementRiskCalculator";

export class CombinedRiskCalculator {

  private static getCombinedRisk(measurementsCalculators: MeasurementRiskCalculator[], strength: number):ICombinedRisk
  {
    let sum = 0;
    for (const calculator of measurementsCalculators)
    {
      sum += calculator.risk;
    }

    const average = sum/measurementsCalculators.length;

    return {
      relationshipStrength: strength,
      risk: average * strength,
      statistics: measurementsCalculators
    };
  }

  public personStatistics: IPersonStatistics;
  private readonly systolicBPCalculator: SystolicBPMeasurementRiskCalculator;
  private readonly diastolicBPCalculator: DiastolicBPMeasurementRiskCalculator;

  public constructor(personStatistics: IPersonStatistics){
    this.personStatistics = personStatistics;
    this.systolicBPCalculator = new SystolicBPMeasurementRiskCalculator();
    this.diastolicBPCalculator = new DiastolicBPMeasurementRiskCalculator();
    this.updateStatistics(personStatistics);
  }
  
  public updateStatistics(personStatistics: IPersonStatistics){
    this.personStatistics = personStatistics;
    this.systolicBPCalculator.updateSatistics(personStatistics.systolicBP);
    this.diastolicBPCalculator.updateSatistics(personStatistics.diastolicBP);
  }

  public calculateCombinedRisk(personStatistics: IPersonStatistics): IRisk
  {
    const allRisks = this.getRisksList()
    const maxRiskCombination = allRisks.reduce((prev, current) => (prev.risk > current.risk) ? prev : current)
    return this.convertCombinedRiskToRisk(maxRiskCombination);
  }

  private getRisksList(): ICombinedRisk[]{
    const allRisks: ICombinedRisk[] = [];

    allRisks.push(CombinedRiskCalculator.getCombinedRisk([this.systolicBPCalculator, this.diastolicBPCalculator], 1));

    return allRisks;
  }
  
  private convertCombinedRiskToRisk(combinedRisk: ICombinedRisk) : IRisk {
    const measurments: IMeasurement[] = [];

    for(const element of combinedRisk.statistics)
    {
      const measurmentData: IMeasurement = {
        name: element.getMeasurementName(),
        riskGrade: element.risk,
        value: element.statistic.lastSample
      };
      measurments.push(measurmentData);
    }

    const risk: IRisk = {
      measurements: measurments,
      totalRiskGrade: combinedRisk.risk
    };

    return risk;
  } 
}
