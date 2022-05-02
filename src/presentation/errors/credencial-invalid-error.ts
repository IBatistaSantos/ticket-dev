export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email/password incorrect');
    this.name = 'InvalidCredentialsError';
  }
}
