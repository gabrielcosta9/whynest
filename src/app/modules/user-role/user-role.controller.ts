import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRole as RoleModel } from '@prisma/client';
import { UserRoleService } from './user-role.service';

@Controller('role')
export class UserRolesController {
  constructor(private readonly roleService: UserRoleService) {
    this.roleService = roleService;
  }

  @Get()
  async getAllRoles(): Promise<RoleModel[] | void | null> {
    try {
      return this.roleService.getAllUserRoles({});
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async getRoleById(@Param('id') id: string): Promise<RoleModel | void | null> {
    try {
      const role = this.roleService.getUserRole({ id: Number(id) });

      if (await role) {
        return role;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @Post()
  async createRole(
    @Body() roleDto: { role: string },
  ): Promise<RoleModel | void | null> {
    try {
      const role = this.roleService.createUserRole(roleDto.role);

      if (await role) {
        return role;
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string) {
    try {
      return this.roleService.deleteUserRole({ id: Number(id) });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
