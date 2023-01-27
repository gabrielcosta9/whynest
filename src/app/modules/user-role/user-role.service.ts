import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { PrismaService } from 'src/app/database/prisma.service';

@Injectable()
export class UserRoleService {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  async getUserRole(
    UserRoleWhereUniqueInput: Prisma.UserRoleWhereUniqueInput,
  ): Promise<UserRole | null> {
    return this.prisma.userRole.findUnique({
      where: UserRoleWhereUniqueInput,
    });
  }

  async getAllUserRoles(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserRoleWhereUniqueInput;
    where?: Prisma.UserRoleWhereInput;
    orderBy?: Prisma.UserRoleOrderByWithRelationInput;
  }): Promise<UserRole[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.userRole.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUserRole(roleDto: string): Promise<UserRole> {
    return this.prisma.userRole.create({
      data: {
        role: roleDto,
      },
    });
  }

  async updateUserRole(params: {
    where: Prisma.UserRoleWhereUniqueInput;
    data: Prisma.UserRoleUpdateInput;
  }): Promise<UserRole> {
    const { where, data } = params;
    return this.prisma.userRole.update({
      data,
      where,
    });
  }

  async deleteUserRole(
    where: Prisma.UserRoleWhereUniqueInput,
  ): Promise<UserRole> {
    return this.prisma.userRole.delete({
      where,
    });
  }
}
