import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/fakeAppointmentsRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();

    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentRepository
    );
  });
  it('should be able to list the appointments on a specific day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 14, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    const appointment2 = await fakeAppointmentRepository.create({
      date: new Date(2020, 7, 20, 15, 0, 0),
      provider_id: 'provider',
      user_id: 'user',
    });

    const appointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 8,
      day: 20,
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
