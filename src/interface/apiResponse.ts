import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class TokenResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class UserAndTokenResponse {
  @ApiProperty({ type: UserResponse })
  user: UserResponse;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

export class ListResponse {
  @ApiProperty()
  page: number;

  @ApiProperty()
  rowsPerPage: number;

  @ApiProperty()
  total: number;
}

export class UserListResponse extends ListResponse {
  @ApiProperty({ isArray: true, type: UserResponse })
  list: Array<UserResponse>;
}
