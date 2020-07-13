import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import ListProviderService from './ListProviderService';

let fakeUserRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('List Providers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProvider = new ListProviderService(fakeUserRepository);
  });
  it('should be able to list providers', async () => {
    const user_1 = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const user_2 = await fakeUserRepository.create({
      name: 'John Tre',
      email: 'johntre@example.com',
      password: '123456',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'John Qua',
      email: 'johnqua@example.com',
      password: '123456',
    });

    const providers = await listProvider.execute({ user_id: loggedUser.id });

    expect(providers).toEqual([user_1, user_2]);
  });
});
