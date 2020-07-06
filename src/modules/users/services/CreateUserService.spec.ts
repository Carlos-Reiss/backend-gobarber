import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import CreatedUserService from './CreatedUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('Create User', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createdUserService = new CreatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createdUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createdUserService = new CreatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    await createdUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createdUserService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
