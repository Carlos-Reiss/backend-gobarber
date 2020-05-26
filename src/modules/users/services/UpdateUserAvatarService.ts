import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/user';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}
@injectable()
class UpdateUserAvatarServices {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

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

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarServices;
