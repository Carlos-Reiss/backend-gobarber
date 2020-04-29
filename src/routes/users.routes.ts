import { Router } from 'express';

const usersRoutes = Router();

usersRoutes.get('/', async (request, response) => {
  try {
    return response.json({ ok: 'true' });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRoutes;
