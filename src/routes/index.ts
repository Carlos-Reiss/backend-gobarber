import { Router } from 'express';
import appointmentRoute from './appointment.routes';
import userRoute from './users.routes';
import sessionsRoute from './sessions.routes';

const routes = Router();
routes.use('/sessions', sessionsRoute);

routes.use('/appointments', appointmentRoute);
routes.use('/users', userRoute);

export default routes;
