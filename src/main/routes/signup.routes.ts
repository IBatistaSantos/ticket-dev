import { Router } from 'express';
import { adaptRoute } from '../adapters/express/route-adapter';
import { makeSignInController } from '../factories/controllers/account/signin-factory';
import { makeSignUpController } from '../factories/controllers/account/signup-factory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/signin', adaptRoute(makeSignInController()));
};
