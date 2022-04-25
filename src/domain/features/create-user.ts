import { Account } from '../models/Account';

export interface CreateAccount {
  execute(params: CreateAccount.Params): Promise<CreateAccount.Result>
}

export namespace CreateAccount {
  export type Params = Omit<Account, 'id'>;

  export type Result = Account | null;
}
