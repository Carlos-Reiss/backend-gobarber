import { Router } from 'express';
import ensureAuthenticatied from '@modules/users/infra/http/middlewares/ensureAuthenticatied';
import ProvidersController from '../controllers/ProvidersController';

const providersRoute = Router();

providersRoute.use(ensureAuthenticatied);
const providersController = new ProvidersController();

providersRoute.get('/', providersController.index);

export default providersRoute;
