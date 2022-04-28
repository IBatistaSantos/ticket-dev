import { AccoutRepository } from '@/infra/db/prisma/repositories/account-repository';
import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import prisma from '@/infra/db/prisma/client';

jest.mock('@/infra/db/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

describe('AccoutRepository - Prisma', () => {
  let sut: AccoutRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;

  beforeAll(() => {
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
  });

  beforeEach(async () => {
    mockReset(prismaMock);
    sut = new AccoutRepository(prismaMock);

    const account: User = {
      id: 'anyId',
      name: 'anyName',
      email: 'anyEmail',
      password: 'anyPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.user.findUnique.mockResolvedValue(account);
    prismaMock.user.create.mockResolvedValue(account);
  });

  it('should return account when load returning account', async () => {
    const result = await sut.load({ email: 'anyEmail' });
    expect(result).toHaveProperty('id');
    expect(result?.email).toEqual('anyEmail');
  });

  it('should return null when load returning null', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    const result = await sut.load({ email: 'anyEmail' });
    expect(result).toBe(null);
  });

  it('should create new account', async () => {
    const data = {
      name: 'anyName',
      email: 'anyEmail',
      password: 'anyPassword',
    };
    const result = await sut.createAccount(data);

    expect(result).toHaveProperty('id');
    expect(result?.email).toEqual('anyEmail');
  });
});
