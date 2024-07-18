import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { reqCurrentUser } from '../common/shared/constants';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request[reqCurrentUser];
  }
);
