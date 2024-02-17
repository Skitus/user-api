import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from 'service/user';
import { ApplicationError, InternalError } from 'shared/error';
import { User } from 'model';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UserNotFoundError('Invalid credentials');
    }

    const { accessToken, refreshToken } = this.generateToken(user);

    return { accessToken, refreshToken };
  }

  public generateToken(user: User): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { email: user.email, sub: user.id };

    const accessToken = this.jwtService.sign(payload, {
      secret: 'skitus',
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: 'skitus2',
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  public async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken?: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: 'skitus2',
      });

      const user = await this.userService.getById(payload.sub);

      if (!user) {
        throw new UserNotFoundError('User not found');
      }

      const { accessToken, refreshToken: newRefreshToken } =
        this.generateToken(user);

      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      throw new InvalidTokenError('Invalid token');
    }
  }
}

export class UserNotFoundError extends ApplicationError {}
export class InvalidTokenError extends InternalError {}
