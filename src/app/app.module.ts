import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, UserRoleModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
