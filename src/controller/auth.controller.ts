import { Body, HttpStatus, Post, Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserFormatter, UserService } from 'service/user';
import { AuthService } from 'service/auth';
import { UserResponse } from 'interface/apiResponse';
import { RegisterUserRequest } from 'interface/apiRequest';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly userFormatter: UserFormatter,
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async register(
    @Body() body: RegisterUserRequest,
  ): Promise<UserResponse> {
    const user = await this.userService.registerUser(body);

    return this.userFormatter.toUserResponse(user);
  }
}
