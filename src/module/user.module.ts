import { Module } from '@nestjs/common';

import { AuthService } from 'service/auth';
import { UserService, UserFormatter } from 'service/user';
import { UserRepository } from 'repository';
import { AuthModule } from './auth.module';
import { UserController } from 'controller/user.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthService } from 'service/jwt/jwt.service';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [
    AuthService,
    UserRepository,
    UserService,
    UserFormatter,
    JwtService,
    JwtAuthService,
  ],
})
export class UserModule {}
