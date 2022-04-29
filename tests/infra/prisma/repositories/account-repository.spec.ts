import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

import { AccoutRepository } from '@/infra/db/prisma/repositories/account-repository';
import prisma from '@/infra/db/prisma/client';

jest.mock('@/infra/db/prisma/client', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

describe('AccoutRepository - Prisma', () => {
  let sut: AccoutRepository;
  let prismaMock: DeepMockProxy<PrismaClient>;
  let account: User;

  beforeAll(() => {
    prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
    account = {
      id: faker.random.alpha(),
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.random.alpha(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  beforeEach(async () => {
    mockReset(prismaMock);
    sut = new AccoutRepository(prismaMock);

    prismaMock.user.findUnique.mockResolvedValue(account);
    prismaMock.user.create.mockResolvedValue(account);
  });

  it('should return account when load returning account', async () => {
    const result = await sut.load({ email: account.email });
    expect(result).toHaveProperty('id');
    expect(result?.email).toEqual(account.email);
  });

  it('should return null when load returning null', async () => {
    prismaMock.user.findUnique.mockResolvedValueOnce(null);
    const result = await sut.load({ email: account.email });
    expect(result).toBe(null);
  });

  it('should create new account', async () => {
    const result = await sut.createAccount(account);

    expect(result).toHaveProperty('id');
    expect(result?.email).toEqual(account.email);
  });
});
