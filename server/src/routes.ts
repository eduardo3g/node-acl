import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const router = Router();

router.post('/users', UserController.create);

router.post('/sessions', SessionController.create);

export default router;
