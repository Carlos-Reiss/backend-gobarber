import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreatedUserService from '../services/CreatedUserService';
import User from '../models/user';
import ensureAuthenticatied from '../middlewares/ensureAuthenticatied';

const usersRoutes = Router();

usersRoutes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreatedUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});
usersRoutes.patch(
  '/avatar',
  ensureAuthenticatied,
  async (request, response) => {
    return response.json({ ok: 'true' });
  }
);
usersRoutes.get('/', async (request, response) => {
  const repository = getRepository(User);
  const users = await repository.find();

  return response.json(users);
});

export default usersRoutes;
