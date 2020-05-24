import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/user';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarServices {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      /* deletar avatar anterior */
      const UserAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const UserAvatarFileExist = await fs.promises.stat(UserAvatarFilePath);

      if (UserAvatarFileExist) {
        await fs.promises.unlink(UserAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarServices;
