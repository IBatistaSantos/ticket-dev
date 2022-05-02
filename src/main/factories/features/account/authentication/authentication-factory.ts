import { AccoutRepository } from '@/infra/db/prisma/repositories/account-repository';
import client from '@/infra/db/prisma/client';
import { AuthenticationService } from '@/data/services';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt/jwt-adapter';
import { env } from '@/main/config/env';

export const makeDbAuthentication = (): AuthenticationService => {
  const secret = env.jwtSecret;
  const salt = 15;
  const jwtAdapter = new JwtAdapter(secret);
  const bcrypAdapter = new BcryptAdapter(salt);
  const accountPrismaRepository = new AccoutRepository(client);

  return new AuthenticationService(
    accountPrismaRepository,
    bcrypAdapter,
    jwtAdapter,
  );
};
