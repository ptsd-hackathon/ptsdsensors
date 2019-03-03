import { Router, Request, Response } from 'express';
import { IUser } from '@models/user.model';
import { createNewUser } from './mongodb.controller';

interface UserCreationRequest extends Request {
  userId: IUser;
}

const router: Router = Router();

router.post('/', (req: UserCreationRequest, res: Response) => {
  res.send('OK');
  console.log(`create user ${req.body.userId}`);
  createNewUser(req.body.userId);
});

export const UsersController: Router = router;
