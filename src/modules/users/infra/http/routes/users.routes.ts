import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserController from '../controllers/UserController';
import UserAvatarControllerler from '../controllers/UserAvatarController';

import ensureAuthenticatied from '../middlewares/ensureAuthenticatied';

const usersRoutes = Router();
const upload = multer(uploadConfig);
const userController = new UserController();
const userAvatarController = new UserAvatarControllerler();

usersRoutes.post('/', userController.create);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticatied,
  upload.single('avatar'),
  userAvatarController.update
);

export default usersRoutes;
