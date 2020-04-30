import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import CreatedUserService from '../services/CreatedUserService';
import User from '../models/user';
import ensureAuthenticatied from '../middlewares/ensureAuthenticatied';
import uploadConfig from '../config/upload';
import UpdateUserAvatar from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreatedUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticatied,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatar();
    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
);

usersRoutes.get('/', async (request, response) => {
  const repository = getRepository(User);
  const users = await repository.find();

  return response.json(users);
});

export default usersRoutes;
