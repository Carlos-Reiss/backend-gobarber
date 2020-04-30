import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import User from '../models/user';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
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

    return {
      user,
    };
  }
}

export default AuthenticatedUserService;
