import IUsersTokensRepository from '@modules/users/repositories/IUserTokensRepository';
/* import User from '@modules/users/infra/typeorm/entities/user'; */
import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import { injectable, inject } from 'tsyringe';

interface IRequest {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokensRepository: IUsersTokensRepository
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    await this.userTokensRepository.generate(user.id);
    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido.'
    );
  }
}
export default SendForgotPasswordEmailService;
