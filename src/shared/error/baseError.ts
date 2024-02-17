import { HttpStatus } from '@nestjs/common';

export class BaseError {
  public id: string;
  public readonly statusCode: number;
  public readonly data?: any;
  public readonly message: string;

  constructor(
    message: string = 'An error occurred',
    statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    data?: any,
  ) {
    this.id = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }
}
