import { Controller } from '@/presentation/protocols';
import SignUpController from '@/presentation/controllers/account/signup';
import { makeDbCreateAccount } from '../../features/account/create/create-account-factory';

import { makeDbAuthentication } from '../../features/account/authentication/authentication-factory';

export const makeSignUpController = (): Controller => new SignUpController(
  makeDbCreateAccount(),
  makeDbAuthentication(),
);
