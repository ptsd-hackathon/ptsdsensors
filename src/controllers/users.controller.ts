import { Router, Request, Response } from 'express';

import { IUser } from '@models/user.model';

interface UserCreationRequest extends Request {
    body: IUser
}

const router: Router = Router();

router.post('/', (req: UserCreationRequest, res: Response) => {
    // createNewUser(req.body.id).subscribe(() => {
    //     res.send('OK');
    // });
});

export const UsersController: Router = router;