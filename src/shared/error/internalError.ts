import { HttpStatus } from '@nestjs/common';
import { BaseError } from './baseError';

export class InternalError extends BaseError {
  constructor(message: string = 'Internal server error', data?: any) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, data);
  }
}
