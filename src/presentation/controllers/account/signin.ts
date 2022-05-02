import { Authentication } from '@/domain/features';
import {
  created, invalidCredentials, serverError,
} from '@/presentation/helpers/http/http-helper';
import {
  Controller, HttpRequest, HttpResponse,
} from '@/presentation/protocols';

export default class SignUpController implements Controller {
  constructor(
    private readonly authentication: Authentication,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const authenticationModel = await this.authentication.execute({
        email,
        password,
      });

      if (!authenticationModel) {
        return invalidCredentials();
      }

      return created(authenticationModel);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
