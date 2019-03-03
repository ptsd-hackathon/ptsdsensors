export interface IRisk {
  totalRiskGrade: number;
  measurements: IMeasurement[];
}

interface IMeasurement {
  name: string;
  value: number;
  riskGrade: number;
}
