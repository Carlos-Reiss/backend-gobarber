import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatedUserService from '@modules/users/services/CreatedUserService';
import { classToClass } from 'class-transformer';

export default class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreatedUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
