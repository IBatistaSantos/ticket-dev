import { HttpResponse } from '../../protocols';
import { InvalidCredentialsError, ServerError, UnauthorizedError } from '../../errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const invalidCredentials = (): HttpResponse => ({
  statusCode: 400,
  body: new InvalidCredentialsError(),
});

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string),
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const created = (data): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const ok = (data): HttpResponse => ({
  statusCode: 200,
  body: data,
});
