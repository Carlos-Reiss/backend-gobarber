import { Router } from 'express';
import ensureAuthenticatied from '@modules/users/infra/http/middlewares/ensureAuthenticatied';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRoute = Router();

providersRoute.use(ensureAuthenticatied);
const providersController = new ProvidersController();
const providerDayAvailability = new ProviderDayAvailabilityController();
const providerMonthAvailability = new ProviderMonthAvailabilityController();

providersRoute.get('/', providersController.index);
providersRoute.get(
  '/:provider_id/day-availability',
  providerDayAvailability.index
);
providersRoute.get(
  '/:provider_id/month-availability',
  providerMonthAvailability.index
);

export default providersRoute;
