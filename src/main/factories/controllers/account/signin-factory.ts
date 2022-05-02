import { Controller } from '@/presentation/protocols';
import SignInController from '@/presentation/controllers/account/signin';

import { makeDbAuthentication } from '../../features/account/authentication/authentication-factory';

export const makeSignInController = (): Controller => new SignInController(
  makeDbAuthentication(),
);
