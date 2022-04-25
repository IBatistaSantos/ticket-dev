import { Account } from '@/domain/models/Account';

export interface LoadUserAccountRepository {
  load: (params: LoadUserAccountRepository.Params) => Promise<LoadUserAccountRepository.Result>
}

export namespace LoadUserAccountRepository {
  export type Params = {
    email: string
  };

  export type Result = undefined | Account;
}

export interface SaveUserAccountRepository {
  createAccount: (params: SaveUserAccountRepository.Params) =>
  Promise<SaveUserAccountRepository.Result>
}

export namespace SaveUserAccountRepository {
  export type Params = Omit<Account, 'id'>;

  export type Result = Account;
}
