import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUsersRepository';
import CreatedUserService from './CreatedUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createdUserService: CreatedUserService;

describe('Create User', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createdUserService = new CreatedUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });
  it('should be able to create a new user', async () => {
    const user = await createdUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
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
