/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../database/prisma.service';
// import { excludeFields } from '../../utils/excludefields';
import { UserService } from './user.service';

const userArray = [
  {
    email: 'usuarioteste1@teste.com.br',
    name: 'Teste 1',
    password: 'Teste1Ii!',
    roleId: 1,
  },
  {
    email: '2@teste.com.br',
    name: 'Teste 2',
    password: 'Teste1Ii!',
    roleId: 2,
  },
  {
    email: 'testeeeeeeeeeee3',
    name: 'Teste 3',
    password: 'Teste1Ii!',
    roleId: 1,
  },
  {
    email: 'teste4@teste.com.br',
    name: 3,
    password: 'Te1Ii!',
    roleId: 1,
  },
  {
    email: 'teste5@teste.com.br',
    name: 'Teste 5',
    password: 'tete!1',
    roleId: 1,
  },
  {
    email: 'teste6@teste.com.br',
    name: 'Teste 6',
    password: 'testeiiiiiiiiiii',
    roleId: 1,
  },
  {
    email: 'teste7@teste.com.br',
    name: 'Teste 7',
    password: 'testeii1w@#',
    roleId: 'blabla',
  },
];

const oneUser = userArray[0];

const db = {
  user: {
    findMany: jest.fn().mockResolvedValue(userArray),
    findUnique: jest.fn().mockResolvedValue(oneUser),
    findFirst: jest.fn().mockResolvedValue(oneUser),
    create: jest.fn().mockReturnValue(oneUser),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneUser),
    delete: jest.fn().mockResolvedValue(oneUser),
  },
};

describe('UserService', () => {
  let service: UserService;
  // let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    // prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      const users = await service.getAllUsers({});
      expect(users).toEqual(userArray);
    });
  });

  describe('getOne', () => {
    it('should get a single user', () => {
      expect(service.getUser({ id: 1 })).resolves.toEqual(oneUser);
    });
  });

  describe('insertOne', () => {
    it('should successfully create a user', async () => {
      const userToCreate = await service.createUser({
        email: 'usuarioteste1@teste.com.br',
        name: 'Teste 1',
        password: 'Teste1Ii!',
        roleId: 1,
      });

      expect(userToCreate).toEqual(oneUser);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const user = await service.updateUser({
        where: {
          id: 1,
        },
        data: {
          name: 'Testei',
        },
      });
      expect(user.name).toEqual(oneUser.name);
    });
  });
});
