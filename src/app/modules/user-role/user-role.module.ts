import { Module } from '@nestjs/common';
import { PrismaService } from 'src/app/database/prisma.service';
import { UserRolesController } from './user-role.controller';
import { UserRoleService } from './user-role.service';

@Module({
  controllers: [UserRolesController],
  providers: [UserRoleService, PrismaService],
})
export class UserRoleModule {}
