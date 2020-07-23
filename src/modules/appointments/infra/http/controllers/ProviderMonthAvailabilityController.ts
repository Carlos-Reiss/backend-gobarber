import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProvidersMonthAvailabilityController {
  /**
   * index
   */
  public async index(request: Request, response: Response): Promise<Response> {
    const { month, year } = request.query;
    const { provider_id } = request.params;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMonthAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year),
    });

    return response.json(availability);
  }
}
