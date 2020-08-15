import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';

const router = Router();

router.post('/users', UserController.create);
router.post('/sessions', SessionController.create);

router.post('/permissions', PermissionController.create);
router.post('/roles', RoleController.create);

export default router;
