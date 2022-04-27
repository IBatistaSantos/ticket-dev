import { LoadUserAccountRepository } from '@/data/contracts/repos';
import { HashComparer } from '@/data/contracts/cryptography/hasher-compare';
import { AuthenticationService } from '@/data/services';
import { mock, MockProxy } from 'jest-mock-extended';
import { Encrypter } from '@/data/contracts/cryptography/encrypter';
import { Account } from '@/domain/models';
import { Authentication } from '@/domain/features';

describe('AuthenticationService', () => {
  let sut: AuthenticationService;

  let loadUserAccountRepository: MockProxy<LoadUserAccountRepository>;
  let hasherComparer: MockProxy<HashComparer>;
  let encrypt: MockProxy<Encrypter>;

  let account: Account;
  let authenticationData: Authentication.Params;

  beforeAll(() => {
    account = {
      id: 'anyId',
      email: 'any@gmail.com',
      name: 'Any Test',
      password: 'anypassword',
      roles: undefined,
      permissions: undefined,
    };

    authenticationData = {
      email: 'any@gmail.com',
      password: 'anypassword',
    };

    loadUserAccountRepository = mock();
    hasherComparer = mock();
    encrypt = mock();

    loadUserAccountRepository.load.mockResolvedValue(account);
    hasherComparer.compare.mockResolvedValue(true);
    encrypt.encrypt.mockResolvedValue('any_token');
  });

  beforeEach(() => {
    sut = new AuthenticationService(
      loadUserAccountRepository,
      hasherComparer,
      encrypt,
    );
  });

  it('should call LoadUserAccountRepository with correct parameters', async () => {
    await sut.execute(authenticationData);
    expect(loadUserAccountRepository.load).toHaveBeenCalledWith({ email: account.email });
    expect(loadUserAccountRepository.load).toHaveBeenCalledTimes(1);
  });

  it('should return null with LoadAccountByEmailReposity returning null', async () => {
    loadUserAccountRepository.load.mockResolvedValueOnce(undefined);
    const result = await sut.execute(authenticationData);
    expect(result).toBe(null);
  });

  it('should call HashComparer with correct parameters', async () => {
    await sut.execute(authenticationData);
    expect(hasherComparer.compare)
      .toHaveBeenCalledWith(authenticationData.password, account.password);
    expect(hasherComparer.compare).toHaveBeenCalledTimes(1);
  });

  it('should return null with HashComparer returning null', async () => {
    hasherComparer.compare.mockResolvedValueOnce(false);
    const result = await sut.execute(authenticationData);
    expect(result).toBe(null);
  });

  it('should return an account and access_token on success', async () => {
    const accountResult = await sut.execute(authenticationData);
    const expectedResult = {
      account,
      access_token: 'any_token',
    };
    expect(accountResult).toEqual(expectedResult);
  });
});
