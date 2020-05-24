import { Router } from 'express';
import appointmentRoute from '@modules/appointments/infra/http/routes/appointment.routes';
import userRoute from '@modules/users/infra/http/routes/users.routes';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();
routes.use('/sessions', sessionsRoute);

routes.use('/appointments', appointmentRoute);
routes.use('/users', userRoute);

export default routes;
