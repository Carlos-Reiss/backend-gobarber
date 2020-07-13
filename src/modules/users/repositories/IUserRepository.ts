import User from '@modules/users/infra/typeorm/entities/user';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/users/dtos/IFindAllProvidersDTO';

export default interface IUsersRepository {
  findAllProviders(data: IFindAllProviderDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>; // encontrar po email
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
