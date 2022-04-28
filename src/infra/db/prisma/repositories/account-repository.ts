import { PrismaClient } from '@prisma/client';
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/data/contracts/repos';
import { Account } from '@/domain/models';

export class AccoutRepository implements LoadUserAccountRepository, SaveUserAccountRepository {
  constructor(
    protected readonly connection: PrismaClient,
  ) { }

  async load(params: LoadUserAccountRepository.Params): Promise<LoadUserAccountRepository.Result> {
    return this.connection.user.findUnique({
      where: {
        email: params.email,
      },
    });
  }

  async createAccount(params: SaveUserAccountRepository.Params): Promise<Account> {
    return this.connection.user.create({ data: params });
  }
}
