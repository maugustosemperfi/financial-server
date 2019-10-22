import { Router } from 'express';
import AccountController from './app/controllers/AccountController';
import BankController from './app/controllers/BankController';
import CreditCardController from './app/controllers/CreditCardController';
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
routes.get('/accounts/simple', AccountController.getSimpleAccounts);

routes.post('/records', RecordController.store);
routes.get('/records/transactions', RecordController.getTransactionsRecords);

routes.post('/banks', BankController.store);
routes.get('/banks', BankController.getAll);

routes.post('/credit-cards', CreditCardController.store);
routes.get('/credit-cards', CreditCardController.getAll);
routes.get('/credit-cards/overview', CreditCardController.overview);
routes.get('/credit-cards/simple', CreditCardController.getSimpleCreditCards);

export default routes;
