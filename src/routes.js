import { Router } from 'express';
import AccountController from './app/controllers/AccountController';
import RecordController from './app/controllers/RecordController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/authentication';
import BankController from './app/controllers/BankController';
import CreditCardController from './app/controllers/CreditCardController';

const routes = new Router();

routes.post('/user', UserController.store);
routes.post('/login', UserController.login);

routes.use(authMiddleware);
routes.post('/accounts', AccountController.store);
routes.get('/accounts', AccountController.getAll);
routes.get('/accounts/overview', AccountController.overview);
routes.get('/accounts/simple', AccountController.getSimpleAccounts);

routes.post('/records', RecordController.store);

routes.post('/banks', BankController.store);
routes.get('/banks', BankController.getAll);

routes.post('/credit-cards', CreditCardController.store);

export default routes;
