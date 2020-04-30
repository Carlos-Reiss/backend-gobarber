import { Router } from 'express';
import AuthenticatedUserServices from '../services/AuthenticatedUserServices';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticatedUserServices();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });
    delete user.password;

    return response.json({ user });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionRouter;
