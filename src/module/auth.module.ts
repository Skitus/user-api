import { Module } from '@nestjs/common';

import { UserFormatter, UserService } from 'service/user';
import { AuthService } from 'service/auth';
import { UserRepository } from 'repository';
import { AuthController } from 'controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from 'service/jwt/jwt.service';
import configuration from 'config/configuration';

const jwtConfig = configuration().jwt;

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConfig.secretAccessToken,
      signOptions: { expiresIn: jwtConfig.expiresInAccessToken },
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    UserRepository,
    UserFormatter,
    JwtAuthService,
  ],
  exports: [UserService, AuthService, UserRepository],
})
export class AuthModule {}
