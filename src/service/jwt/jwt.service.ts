import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'config/configuration';
import { IUser } from 'interface/apiRequest';

const jwtConfig = configuration().jwt;

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  createAccessToken(user: IUser): {
    accessToken: string;
  } {
    return {
      accessToken: this.jwtService.sign(
        {
          email: user.email,
          id: user.sub,
        },
        {
          secret: jwtConfig.secretAccessToken,
          expiresIn: jwtConfig.expiresInAccessToken,
        },
      ),
    };
  }

  createRefreshToken(user: IUser): {
    refreshToken: string;
  } {
    return {
      refreshToken: this.jwtService.sign(
        {
          email: user.email,
          id: user.sub,
        },
        {
          secret: jwtConfig.secretRefreshToken,
          expiresIn: jwtConfig.expiresInRefreshToken,
        },
      ),
    };
  }

  verifyUserWithAccessToken(accessToken: string): { id: number } {
    try {
      const result = this.jwtService.verify(accessToken, {
        secret: jwtConfig.secretAccessToken,
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  verifyUserWithRefreshToken(refreshToken: string): { id: number } {
    try {
      const result = this.jwtService.verify(refreshToken, {
        secret: jwtConfig.secretRefreshToken,
      });
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
