import { MockProxy, mock } from 'jest-mock-extended';

import { Hasher } from '@/data/contracts/cryptography';
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/data/contracts/repos';
import { CreateAccountService } from '@/data/services';
import { Account } from '@/domain/models';

describe('CreateAccountService', () => {
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>;
  let saveUserAccountRepository: MockProxy<SaveUserAccountRepository>;
  let hasher: MockProxy<Hasher>;
  let resultAccountMock: SaveUserAccountRepository.Result;
  let accountData: Omit<Account, 'id'>;

  let sut: CreateAccountService;
  beforeAll(() => {
    loadUserAccountRepository = mock();
    saveUserAccountRepository = mock();
    hasher = mock();

    resultAccountMock = {
      id: 'anyId',
      email: 'any@gmail.com',
      name: 'Any Test',
      password: 'anypassword',
      roles: undefined,
      permissions: undefined,
    };

    accountData = {
      email: 'any@gmail.com',
      name: 'Any Test',
      password: 'anypassword',
    };

    loadUserAccountRepository.load.mockResolvedValue(undefined);

    saveUserAccountRepository.createAccount.mockResolvedValue(resultAccountMock);

    hasher.hash.mockResolvedValue('anypassword');
  });
  beforeEach(() => {
    sut = new CreateAccountService(loadUserAccountRepository, saveUserAccountRepository, hasher);
  });

  it('should call LoadUserAccountRepository with correct parameters', async () => {
    await sut.execute(accountData);
    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: resultAccountMock.email });
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1);
  });

  it('should return null with LoadAccountByEmailReposity finds one', async () => {
    loadUserAccountRepository.load.mockResolvedValueOnce(resultAccountMock);
    const result = await sut.execute(resultAccountMock);
    expect(result).toBe(null);
  });

  it('should call Hasher with correct parameters', async () => {
    await sut.execute(accountData);
    expect(hasher.hash).toHaveBeenCalledWith(resultAccountMock.password);
    expect(hasher.hash).toHaveBeenCalledTimes(1);
  });

  it('should call SaveUserAccountRepository with correct parameters', async () => {
    await sut.execute(accountData);
    expect(saveUserAccountRepository.createAccount).toHaveBeenCalledWith(accountData);
    expect(saveUserAccountRepository.createAccount).toHaveBeenCalledTimes(1);
  });

  it('should return an account on success', async () => {
    const result = await sut.execute(accountData);
    expect(result).toBe(resultAccountMock);
  });
});
