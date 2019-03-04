import { Router, Request, Response } from 'express';
import { IUser } from '../models/user.model';
import { createNewUser } from './mongodb.controller';

interface UserCreationRequest extends Request {
  userId: IUser;
}

const router: Router = Router();

router.post('/', (req: UserCreationRequest, res: Response) => {
  console.log(`create user ${req.body.userId}`);
  
  if (!req.body || !req.body.userId) {
    res.status(500).send('Missing userId');
    return;
  }
  
  createNewUser(req.body.userId);
  res.send('OK');
});

export const UsersController: Router = router;
