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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 5, 10, 13),
      provider_id: '11242',
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('11242');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 9, 15, 11);

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
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 10, 11),
        provider_id: '123123',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 10, 13),
        provider_id: '123123',
        user_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 5, 10, 12).getTime();
    });

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 11, 7),
        provider_id: '123123',
        user_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentService.execute({
        date: new Date(2020, 5, 11, 18),
        provider_id: '123123',
        user_id: 'provider_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
