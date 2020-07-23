import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProvidersDayAvailabilityController {
  /**
   * index
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year, day } = request.query;
    const { provider_id } = request.params;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProviderDayAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year),
      day: Number(day),
    });

    return response.json(availability);
  }
}
