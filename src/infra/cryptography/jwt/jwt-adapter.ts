import { Encrypter } from '@/data/contracts/cryptography';
import jwt from 'jsonwebtoken';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  async encrypt(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret);
  }
}
