import { Router, Request, Response } from 'express';

import { IUser } from '@models/user.model';
import { createNewUser } from './mongodb.controller';

interface UserCreationRequest extends Request {
    body: IUser
}

const router: Router = Router();

router.post('/', (req: UserCreationRequest, res: Response) => {
    res.send('OK');
    createNewUser(req.body.id);
});

export const UsersController: Router = router;