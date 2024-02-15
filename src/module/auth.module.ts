import { Module } from '@nestjs/common';

import { UserFormatter, UserService } from 'service/user';
import { AuthService } from 'service/auth';
import { UserRepository } from 'repository';
import { AuthController } from 'controller/auth.controller';

@Module({
  controllers: [AuthController],
  providers: [UserService, AuthService, UserRepository, UserFormatter],
  exports: [UserService, AuthService, UserRepository],
})
export class AuthModule {}
