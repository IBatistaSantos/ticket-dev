import { Authentication, CreateAccount } from '@/domain/features';
import { EmailInUseError } from '@/presentation/errors';
import {
  created, forbidden, serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export default class SignUpController implements Controller {
  constructor(
    private readonly createAccount: CreateAccount,
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;

      const account = await this.createAccount.execute({
        name,
        email,
        password,
      });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const authenticationModel = await this.authentication.execute({
        email,
        password,
      });

      return created(authenticationModel);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
