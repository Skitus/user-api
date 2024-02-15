import {
  Controller,
  Get,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order, UserListOrderBy } from 'interface/apiRequest';
import { UserListResponse, UserResponse } from 'interface/apiResponse';
import { UserFormatter, UserService } from 'service/user';
import { Auth, RequestingUser } from 'shared/decorator';
import { UserPaginationRequest } from 'shared/value_object/pagination_request';
import { User } from 'model';
import { AuthService } from 'service/auth';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFormatter: UserFormatter,
    private readonly authService: AuthService,
  ) {}

  @Get('/current')
  @Auth()
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getCurrent(@RequestingUser() user: User): Promise<UserResponse> {
    return this.userFormatter.toUserResponse(user);
  }

  @Get()
  @Auth()
  @ApiQuery({ name: 'page', type: Number })
  @ApiQuery({ name: 'rowsPerPage', type: Number })
  @ApiQuery({ name: 'order', enum: Order, required: false, enumName: 'Order' })
  @ApiQuery({
    name: 'orderBy',
    enum: UserListOrderBy,
    required: false,
    enumName: 'UserListOrderBy',
    type: String,
  })
  @ApiQuery({ name: 'filters', isArray: true, type: String, required: false })
  @ApiResponse({ status: HttpStatus.OK, type: UserListResponse })
  public async getAllUsers(
    @Query('page', ParseIntPipe) page: number,
    @Query('rowsPerPage', ParseIntPipe) rowsPerPage: number,
    @Query('order') order: Order = Order.Desc,
    @Query('orderBy') orderBy: UserListOrderBy = UserListOrderBy.CreatedAt,
    @Query('filters') filters: string | Array<string> = [],
  ): Promise<UserListResponse> {
    const paginationRequest = new UserPaginationRequest(
      page,
      rowsPerPage,
      Array.isArray(filters) ? filters : [filters],
      order,
      orderBy,
    );

    const result = await this.userService.getAllUsers(paginationRequest);

    return this.userFormatter.toUserListResponse(result);
  }
}
