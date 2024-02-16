import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'service/auth';
import { UserService, UserFormatter } from 'service/user';
import { UserResponse } from 'interface/apiResponse';
import {
  UserCredentialsRequest,
  RegisterUserRequest,
} from 'interface/apiRequest';
import { User } from 'model';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @ApiResponse({ status: HttpStatus.OK, type: UserResponse })
  public async register(
    @Body() registerRequest: RegisterUserRequest,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const user = await this.userService.registerUser(registerRequest);
    const { accessToken, refreshToken } = this.authService.generateToken(user);
    return { user, accessToken, refreshToken };
  }

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponse,
    description: 'Successful Login',
  })
  public async login(
    @Body() loginRequest: UserCredentialsRequest,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = loginRequest;
    const { accessToken, refreshToken } = await this.authService.login(
      email,
      password,
    );
    return { accessToken, refreshToken };
  }

  @Post('refresh')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token successfully refreshed.',
  })
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
