import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// Rotas que não precisam de token
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// colocando a checagem de token como GLOBAL
// Qualquer rota depois daqui irá solicitar o token de autenticação
routes.use(authMiddleware);


routes.put('/users', authMiddleware, UserController.update);



export default routes;

