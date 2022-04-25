import { CreateAccount } from '@/domain/features/create-user';
import { Hasher } from '../contracts/cryptography/hasher';
import { LoadUserAccountRepository, SaveUserAccountRepository } from '../contracts/repos/account';

export class CreateAccountService implements CreateAccount {
  constructor(
    private readonly loadUserAccountRepository: LoadUserAccountRepository,
    private readonly saveUserAccountRepository: SaveUserAccountRepository,
    private readonly hasher: Hasher,
  ) {}

  async execute(params: CreateAccount.Params): Promise<CreateAccount.Result> {
    const {
      email, name, password, roles, permissions,
    } = params;

    const accountAlreadyExists = await this.loadUserAccountRepository.load({ email });

    if (!accountAlreadyExists) {
      const hashedPassword = await this.hasher.hash(password);

      const account = await this.saveUserAccountRepository.createAccount({
        name,
        email,
        password: hashedPassword,
        roles,
        permissions,
      });

      return account;
    }

    return null;
  }
}
