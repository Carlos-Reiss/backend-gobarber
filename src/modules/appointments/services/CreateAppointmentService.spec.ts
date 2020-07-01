import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/fakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('Create Appointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );
    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '11242',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11242');
  });
  it('should not be able to create to appointment on the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '11242',
    });

    expect(
      createAppointmentService.execute({
        date: appointmentDate,
        provider_id: '11242',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
