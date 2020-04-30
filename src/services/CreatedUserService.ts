import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/user';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreadetUserService {
  async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await userRepository.findOne({ where: { email } });

    if (checkUserExist) {
      throw new AppError('Email address already user.');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}
export default CreadetUserService;
