import { MockProxy, mock } from 'jest-mock-extended';

import { Hasher } from '@/data/contracts/cryptography';
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/data/contracts/repos';
import { CreateAccountService } from '@/data/services';
import { Account } from '@/domain/models';

describe('CreateAccountService', () => {
  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>;
  let saveUserAccountRepository: MockProxy<SaveUserAccountRepository>;
  let hasher: MockProxy<Hasher>;
  let saveAccountMock: Account;
  let accountData: Account;

  let sut: CreateAccountService;
  beforeAll(() => {
    loadUserAccountRepository = mock();
    saveUserAccountRepository = mock();
    hasher = mock();

    saveAccountMock = {
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

    saveUserAccountRepository.createAccount.mockResolvedValue(saveAccountMock);

    hasher.hash.mockResolvedValue('anypassword');
  });
  beforeEach(() => {
    sut = new CreateAccountService(loadUserAccountRepository, saveUserAccountRepository, hasher);
  });

  it('should call LoadUserAccountRepository with correct parameters', async () => {
    await sut.execute(saveAccountMock);
    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: saveAccountMock.email });
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1);
  });

  it('should return null with LoadAccountByEmailReposity finds one', async () => {
    loadUserAccountRepository.load.mockResolvedValueOnce(saveAccountMock);
    const result = await sut.execute(saveAccountMock);
    expect(result).toBe(null);
  });

  it('should call Hasher with correct parameters', async () => {
    await sut.execute(saveAccountMock);
    expect(hasher.hash).toHaveBeenCalledWith(saveAccountMock.password);
    expect(hasher.hash).toHaveBeenCalledTimes(1);
  });

  it('should call SaveUserAccountRepository with correct parameters', async () => {
    await sut.execute(saveAccountMock);
    expect(saveUserAccountRepository.createAccount).toHaveBeenCalledWith(accountData);
    expect(saveUserAccountRepository.createAccount).toHaveBeenCalledTimes(1);
  });

  it('should return an account on success', async () => {
    const result = await sut.execute(accountData);
    expect(result).toBe(saveAccountMock);
  });
});
