import { Request, Response } from 'express';
import AuthenticatedUserServices from '@modules/users/services/AuthenticatedUserServices';

import { container } from 'tsyringe';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticatedUserServices);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;

    return response.json({ user, token });
  }
}
