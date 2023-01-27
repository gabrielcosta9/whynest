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
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  name: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsInt()
  @Min(1)
  @Max(3)
  roleId: number;
}
