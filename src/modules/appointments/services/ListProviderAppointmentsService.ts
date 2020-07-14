import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import { injectable, inject } from 'tsyringe';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}
/*
 * [ { day: 1, available: false } ]
 */

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      }
    );
    return appointments;
  }
}

export default ListProviderAppointmentsService;
