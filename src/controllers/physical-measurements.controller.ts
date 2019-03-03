import { Router, Request, Response } from 'express';

import { IUser } from '@models/user.model';
import { getProfileStatistics } from './mongodb';

interface BasicRequest extends Request {
    body: IUser
}

const router: Router = Router();

router.post('/', (req: BasicRequest, res: Response) => {
    getProfileStatistics().subscribe(profileStatistics => {
        const response: IRisk = calculateRisk(req.body, profileStatistics);
        res.json(response);
    });
});

function calculateRisk(user: IUser, statistics: IPersonStatistics): IRisk {
    return {
        totalRiskGrade: 0.4,
        measurements: []
    };
}

export const PhysicalMeasurementsController: Router = router;