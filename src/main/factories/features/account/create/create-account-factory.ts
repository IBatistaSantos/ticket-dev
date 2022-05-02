import { AccoutRepository } from '@/infra/db/prisma/repositories/account-repository';
import client from '@/infra/db/prisma/client';
import { CreateAccount } from '@/domain/features';
import { CreateAccountService } from '@/data/services';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter';

export const makeDbCreateAccount = (): CreateAccount => {
  const salt = 12;
  const bcrypAdapter = new BcryptAdapter(salt);

  const accountPrismaRepository = new AccoutRepository(client);

  return new CreateAccountService(
    accountPrismaRepository,
    accountPrismaRepository,
    bcrypAdapter,

  );
};
