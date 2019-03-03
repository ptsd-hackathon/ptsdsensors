import { Router, Request, Response } from 'express';

import { getProfileStatistics } from './mongodb.controller';
import { IUser } from '@models/user.model';
import { IRisk } from '@models/risk.model';
import { IPersonStatistics } from '@models/statistics.model';

interface PhysicalMeasurementsRequest extends Request {
  body: IUser;
}

const router: Router = Router();

router.post('/:userId', (req: PhysicalMeasurementsRequest, res: Response) => {
  getProfileStatistics(req.params.userId).subscribe(profileStatistics => {
    const response: IRisk = calculateRisk(req.body, profileStatistics);
    res.json(response);
  });
});

function calculateRisk(user: IUser, statistics: IPersonStatistics): IRisk {
  console.log(user, statistics);
  return {
    totalRiskGrade: 0.4,
    measurements: [],
  };
}

export const PhysicalMeasurementsController: Router = router;
