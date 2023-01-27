import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  constructor(email: string, name: string, password: string, role: number) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.roleId = role;
  }

  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsInt()
  @Min(1)
  @Max(3)
  @ApiProperty()
  roleId: number;
}
