import { Authentication } from '@/domain/features';
import { Encrypter } from '../contracts/cryptography/encrypter';
import { HashComparer } from '../contracts/cryptography/hasher-compare';
import { LoadUserAccountRepository } from '../contracts/repos';

export class AuthenticationService implements Authentication {
  constructor(
    private readonly loadUserAccountRepository: LoadUserAccountRepository,
    private readonly hasherComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(params: Authentication.Params): Promise<Authentication.Result> {
    const { email, password } = params;

    const account = await this.loadUserAccountRepository.load({
      email,
    });

    if (!account) {
      return null;
    }

    const matchPassword = await this.hasherComparer.compare(
      password,
      account.password,
    );

    if (!matchPassword) {
      return null;
    }

    const accessToken = await this.encrypter.encrypt(account.id);

    return {
      access_token: accessToken,
      account,
    };
  }
}
