import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    this.userService = userService;
  }

  @Get()
  async getAllUsers(): Promise<Partial<UserModel>[] | void | null> {
    try {
      return this.userService.getAllUsers({});
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Get(':id')
  async getUserById(
    @Param('id') id: string,
  ): Promise<Partial<UserModel> | void | null> {
    try {
      const user = this.userService.getUser({ id: Number(id) });

      if (await user) {
        return user;
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Get('email')
  async getUserByEmail(
    @Body('email') email: string,
  ): Promise<Partial<UserModel> | void | null> {
    try {
      const user = this.userService.getUser({ email: String(email) });

      if (await user) {
        return user;
      }
    } catch (error: any) {
      console.error(error);
      throw new Error(error);
    }
  }

  @Post()
  async signUp(@Body() UserDto: CreateUserDto): Promise<string | void | null> {
    try {
      this.userService.createUser(UserDto);
      return 'Usuário criado';
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }

  @Delete(':id')
  async deleteByID(@Param('id') id: string): Promise<UserModel | void | null> {
    try {
      return this.userService.deleteUser({ id: Number(id) });
    } catch (err: any) {
      console.error(err);
      throw new Error(err);
    }
  }
}
