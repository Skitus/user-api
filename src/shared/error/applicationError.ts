import { HttpStatus } from '@nestjs/common';
import { BaseError } from './baseError';

export class ApplicationError extends BaseError {
  constructor(message: string = 'Bad Request', data?: any) {
    super(message, HttpStatus.BAD_REQUEST, data);
  }
}
