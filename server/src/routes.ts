import { Router } from 'express';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import PermissionController from './controllers/PermissionController';
import RoleController from './controllers/RoleController';
import ProductController from './controllers/ProductController';

const router = Router();

router.post('/users', UserController.create);
router.post('/sessions', SessionController.create);

router.post('/permissions', PermissionController.create);
router.post('/roles', RoleController.create);

router.post('/products', ProductController.create);
router.post('/products', ProductController.index);
router.post('/products/:id', ProductController.show);

export default router;
