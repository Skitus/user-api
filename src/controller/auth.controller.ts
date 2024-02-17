import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'service/auth';
import { UserService } from 'service/user';
import { TokenResponse, UserAndTokenResponse } from 'interface/apiResponse';
import {
  UserCredentialsRequest,
  RegisterUserRequest,
  RefreshTokenRequest,
} from 'interface/apiRequest';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserAndTokenResponse,
    description: 'Successful Registered',
  })
  public async register(
    @Body() registerRequest: RegisterUserRequest,
  ): Promise<UserAndTokenResponse> {
    const user = await this.userService.registerUser(registerRequest);
    const { accessToken, refreshToken } = this.authService.generateToken(user);
    return { user, accessToken, refreshToken };
  }

  @Post('/login')
  @ApiResponse({
    status: HttpStatus.OK,
    type: TokenResponse,
    description: 'Successful Login',
  })
  public async login(
    @Body() loginRequest: UserCredentialsRequest,
  ): Promise<TokenResponse> {
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
    type: TokenResponse,
    description: 'Token successfully refreshed.',
  })
  async refresh(@Body() body: RefreshTokenRequest): Promise<TokenResponse> {
    return this.authService.refreshToken(body.refreshToken);
  }
}
