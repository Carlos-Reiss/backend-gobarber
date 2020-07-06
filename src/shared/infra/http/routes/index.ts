import { Router } from 'express';
import appointmentRouter from '@modules/appointments/infra/http/routes/appointment.routes';
import userRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';

const routes = Router();
routes.use('/sessions', sessionsRoute);

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/password', passwordRouter);

export default routes;
