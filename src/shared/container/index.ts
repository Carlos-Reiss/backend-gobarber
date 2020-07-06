import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import IUserRepository from '@modules/users/repositories/IUserRepository';

/* import UserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'; */

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentRepository',
  AppointmentRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
