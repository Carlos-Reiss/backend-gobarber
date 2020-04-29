import { Router } from 'express';
import appointmentRoute from './appointment.routes';
import userRoute from './users.routes';

const routes = Router();

routes.use('/appointments', appointmentRoute);
routes.use('/users', userRoute);

export default routes;
