import { Injectable } from '@nestjs/common';
import { UserService } from 'service/user';
import { ApplicationError, InternalError } from 'shared/error';
import { User } from 'model';
import { JwtAuthService } from 'service/jwt/jwt.service';
import { TokenResponse } from 'interface/apiResponse';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, password: string): Promise<TokenResponse> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UserNotFoundError('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateToken(user);

    return { accessToken, refreshToken };
  }

  public generateToken(user: User): TokenResponse {
    const payload = { email: user.email, sub: user.id };

    const { accessToken } = this.jwtAuthService.createAccessToken(payload);

    const { refreshToken } = this.jwtAuthService.createRefreshToken(payload);

    return { accessToken, refreshToken };
  }

  public async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      const payload =
        this.jwtAuthService.verifyUserWithRefreshToken(refreshToken);

      const user = await this.userService.getById(payload.id);

      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        this.generateToken(user);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new InvalidTokenError('Invalid token');
    }
  }
}

export class UserNotFoundError extends ApplicationError {}
export class InvalidTokenError extends InternalError {}
