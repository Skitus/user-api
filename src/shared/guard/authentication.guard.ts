import { Injectable, ExecutionContext, CanActivate } from '@nestjs/common';
import { JwtAuthService } from 'service/jwt/jwt.service';
import { UserService } from 'service/user';
import { ApplicationError } from 'shared/error';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtAuthService: JwtAuthService,
    private userService: UserService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('JWT is not provided');
    }

    try {
      const payload = this.jwtAuthService.verifyUserWithAccessToken(token);
      const user = await this.userService.getById(payload.id);

      if (!user) {
        throw new UnauthorizedException('User is not found');
      }

      req.user = user;
      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new UnauthorizedException('Unauthorized: ' + error.message);
      } else {
        throw new UnauthorizedException('Unauthorized: Unknown error');
      }
    }
  }
}

export class UnauthorizedException extends ApplicationError {}
