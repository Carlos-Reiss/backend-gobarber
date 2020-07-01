import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import AuthenticatedUserServices from './AuthenticatedUserServices';
import CreatedUserService from './CreatedUserService';

describe('Authenticate User', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticatedUser = new AuthenticatedUserServices(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticatedUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should not be able to authenticate with non existing user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticatedUser = new AuthenticatedUserServices(
      fakeUserRepository,
      fakeHashProvider
    );

    expect(
      authenticatedUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticatedUser = new AuthenticatedUserServices(
      fakeUserRepository,
      fakeHashProvider
    );
    const createUser = new CreatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(
      authenticatedUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
