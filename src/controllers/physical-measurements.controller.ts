import { Router, Request, Response } from 'express';

import { getProfileStatistics } from './mongodb.controller';
import { IUser } from '../models/user.model';
import { IRisk } from '../models/risk.model';
import { IPersonStatistics } from '../models/statistics.model';
import {CombinedRiskCalculator} from "./CombinedRiskCalculator";

interface PhysicalMeasurementsRequest extends Request {
  body: IUser;
}

const router: Router = Router();

router.post('/', (req: PhysicalMeasurementsRequest, res: Response) => {
  getProfileStatistics(req.body.userId).subscribe(profileStatistics => {
    const response: IRisk = calculateRisk(req.body, profileStatistics);
    res.json(response);
  });
});

function calculateRisk(user: IUser, statistics: IPersonStatistics): IRisk {
  const combinedRiskCalculator = new CombinedRiskCalculator(statistics);
  combinedRiskCalculator.updateStatistics(statistics);
  const totalRiskData = combinedRiskCalculator.calculateCombinedRisk(statistics);
  return totalRiskData;
}

export const PhysicalMeasurementsController: Router = router;
