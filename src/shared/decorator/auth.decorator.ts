import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from 'shared/guard';

export function Auth() {
  return applyDecorators(
    UseGuards(AuthenticationGuard),
    ApiBearerAuth('authorization'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
