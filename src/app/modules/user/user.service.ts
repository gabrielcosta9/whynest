import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { hash } from 'argon2';
import { PrismaService } from '../../database/prisma.service';
import { excludeFields } from '../../utils/excludefields';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async getUser(
    UserWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findUnique({
      where: UserWhereUniqueInput,
    });

    if (!user) return null;

    return excludeFields(user, ['password']);
  }

  async getAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Partial<User>[]> {
    const { skip, take, cursor, where, orderBy } = params;
    const users = await this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });

    return users.map((user) => excludeFields(user, ['password']));
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: await hash(createUserDto.password),
        roleId: createUserDto.roleId,
      },
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
