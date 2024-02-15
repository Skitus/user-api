import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationError } from 'shared/error';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
}

export class NotValidTokenError extends ApplicationError {}
export class CognitoUserDoesNotExistsError extends ApplicationError {}
