import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import auth from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}
class AuthenticatedUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect Email/password combination.');
    }
    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect Email/password combination.');
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
