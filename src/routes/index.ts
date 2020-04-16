import { Router } from 'express';
import appointmentRoute from './appointment.routes';

const routes = Router();

routes.use('/appointments', appointmentRoute);

export default routes;
