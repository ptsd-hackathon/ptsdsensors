export interface IRisk {
  totalRiskGrade: number;
  measurements: IMeasurement[];
}

export interface IMeasurement {
  name: string;
  value: number;
  riskGrade: number;
}
