import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApplicationError } from 'shared/error';
import { ERROR_MESSAGES } from './error.messages';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof ApplicationError) {
          const response = context.switchToHttp().getResponse();

          const errorMessage =
            err.message !== err.id ? err.message : ERROR_MESSAGES[err.id];

          return new Observable(() =>
            response.status(err.statusCode).send({
              id: err.id,
              message: errorMessage,
              statusCode: err.statusCode,
              data: err.data,
            }),
          );
        }

        return throwError(() => err);
      }),
    );
  }
}
