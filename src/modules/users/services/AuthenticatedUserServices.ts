import { sign } from 'jsonwebtoken';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/user';
import auth from '@config/auth';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
  token: string;
}
@injectable()
class AuthenticatedUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect Email/password combination.', 401);
    }
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect Email/password combination.', 401);
    }

    const token = sign({}, auth.secret, {
      expiresIn: auth.expiredIn,
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticatedUserService;
