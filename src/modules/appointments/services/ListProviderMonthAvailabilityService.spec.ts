import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();

    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 8, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 9, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 10, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 11, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 12, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 21, 13, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 14, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 15, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 16, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 17, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 18, 0, 0),
      provider_id: 'user',
      user_id: 'user_id',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: true },
        { day: 22, available: true },
      ])
    );
  });
});
