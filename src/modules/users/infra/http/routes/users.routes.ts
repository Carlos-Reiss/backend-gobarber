import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';
import uploadConfig from '@config/upload';
import CreatedUserService from '@modules/users/services/CreatedUserService';
import User from '@modules/users/infra/typeorm/entities/user';
import UpdateUserAvatar from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticatied from '../middlewares/ensureAuthenticatied';

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

  const userNotPassword = users.filter(user => {
    const { avatar, email, name, created_at, id, updated_at } = user;
    return { newUser: { avatar, email, name, created_at, id, updated_at } };
  });
  return response.json(userNotPassword);
});

export default usersRoutes;
