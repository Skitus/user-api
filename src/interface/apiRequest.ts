import { ApiProperty } from 'shared/decorator';

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class RegisterUserRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class CreateUserRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export enum UserListOrderBy {
  FirstName = 'user.first_name',
  LastName = 'user.last_name',
  CreatedAt = 'user.created_at',
  Role = 'user.role',
}
