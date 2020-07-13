import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('Create Appointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
  });
  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '11242',
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11242');
  });
  it('should not be able to create to appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '11242',
      user_id: '123123',
    });

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '11242',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
