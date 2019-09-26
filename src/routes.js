import { Router } from 'express';
import AccountController from './app/controllers/AccountController';
import RecordController from './app/controllers/RecordController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/authentication';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

routes.use(authMiddleware);
routes.post('/accounts', AccountController.store);
routes.get('/accounts', AccountController.getAll);
routes.get('/accounts/overview', AccountController.overview);

routes.post('/records', RecordController.store);

export default routes;
