import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  /**
   * index
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;
    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentService
    );

    const appointment = await listProviderAppointments.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(appointment);
  }
}
