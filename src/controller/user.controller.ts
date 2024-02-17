import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  Order,
  UpdateUserRequest,
  UserListOrderBy,
} from 'interface/apiRequest';
import { UserListResponse, UserResponse } from 'interface/apiResponse';
import { UserFormatter, UserService } from 'service/user';
import { Auth, RequestingUser } from 'shared/decorator';
import { UserPaginationRequest } from 'shared/value_object/pagination_request';
import { User } from 'model';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userFormatter: UserFormatter,
  ) {}

  @Get('/current')
  @Auth()
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
    description: 'Get user`s account',
  })
  public async getCurrent(@RequestingUser() user: User): Promise<UserResponse> {
    return this.userFormatter.toUserResponse(user);
  }

  @Get('/:id')
  @Auth()
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Get user by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async getUser(
    @RequestingUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const foundUser = await this.userService.getById(id);

    this.userService.ensureUserHasAccessToAnotherUser(foundUser, user);

    return this.userFormatter.toUserResponse(user);
  }

  @Put('/:id')
  @Auth()
  @ApiParam({
    name: 'id',
    required: true,
    type: Number,
    description: 'Update user by id',
  })
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async updateUser(
    @Body() body: UpdateUserRequest,
    @RequestingUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserResponse> {
    const foundUser = await this.userService.getById(id);

    this.userService.ensureUserHasAccessToAnotherUser(foundUser, user);

    const updatedUser = await this.userService.updateUser(foundUser, body);

    return this.userFormatter.toUserResponse(updatedUser);
  }

  @Delete(':id')
  @Auth()
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async deleteUser(
    @Param('id', ParseIntPipe) userId: number,
    @RequestingUser() currentUser: User,
  ): Promise<void> {
    await this.userService.deleteUser(userId, currentUser);
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
