import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();

    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );
  });
  it('should be able to list the day availability from provider', async () => {
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 7, 20, 11).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 8,
      day: 20,
    });
    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: true },
      ])
    );
  });
});
