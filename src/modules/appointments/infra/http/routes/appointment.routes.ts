import { Router } from 'express';
import ensureAuthenticatied from '@modules/users/infra/http/middlewares/ensureAuthenticatied';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticatied);
const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentsController();

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;
