import { ApiProperty } from 'shared/decorator';

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class UserCredentialsRequest {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterUserRequest extends UserCredentialsRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export enum UserListOrderBy {
  FirstName = 'user.first_name',
  LastName = 'user.last_name',
  CreatedAt = 'user.created_at',
  Role = 'user.role',
}
