import { Router } from 'express';
import AccountController from './app/controllers/AccountController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/authentication';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

routes.use(authMiddleware);
routes.post('/accounts', AccountController.store);
routes.get('/accounts', AccountController.getAll);

export default routes;
