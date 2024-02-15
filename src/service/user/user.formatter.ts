import { Injectable } from '@nestjs/common';

import { UserListResponse, UserResponse } from 'interface/apiResponse';
import { User } from 'model';
import { PaginationResponse } from 'shared/value_object/pagination_response';

@Injectable()
export class UserFormatter {
  constructor() {}
  public toUserResponse(user: User): UserResponse {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  public toUserListResponse(
    userPaginationResponse: PaginationResponse<User>,
  ): UserListResponse {
    return {
      list: userPaginationResponse.list,
      page: userPaginationResponse.page,
      rowsPerPage: userPaginationResponse.rowsPerPage,
      total: userPaginationResponse.total,
    };
  }
}
