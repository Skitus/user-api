import { ApiProperty } from 'shared/decorator';

export enum Order {
  Asc = 'ASC',
  Desc = 'DESC',
}

export class RefreshTokenRequest {
  @ApiProperty()
  refreshToken: string;
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

export class UpdateUserRequest {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export enum UserListOrderBy {
  FirstName = 'user.firstName',
  LastName = 'user.lastName',
  CreatedAt = 'user.createdAt',
}
