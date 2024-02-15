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
