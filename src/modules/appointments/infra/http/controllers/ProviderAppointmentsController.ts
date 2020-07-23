import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderAppointmentService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  /**
   * index
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;
    const provider_id = request.user.id;

    const listProviderAppointments = container.resolve(
      ListProviderAppointmentService
    );

    const appointment = await listProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id,
    });

    return response.json(classToClass(appointment));
  }
}
