import { Request, Response, Router } from 'express';

import { IRisk } from '../models/risk.model';
import { IPersonStatistics } from '../models/statistics.model';
import { IUser } from '../models/user.model';
import {CombinedRiskCalculator} from "./combinedRiskCalculator";
import { getProfileStatistics } from './mongodb.controller';

interface IBasicRequest extends Request {
    body: IUser
}

const router: Router = Router();

router.post('/', (req: IBasicRequest, res: Response) => {
    getProfileStatistics().subscribe(profileStatistics => {
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
