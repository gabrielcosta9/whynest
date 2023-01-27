export class UserDto {
  constructor(email: string, name: string, role: number) {
    this.email = email;
    this.name = name;
    this.roleId = role;
  }

  email: string;

  name: string;

  roleId: number;
}
