import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const fieldName = context.getHandler().name;
    const ctx = GqlExecutionContext.create(context).getContext();
    const rights = ctx.rights;

    if (!rights || !rights.includes(fieldName)) {
      throw new UnauthorizedException(`You must have ${fieldName} right`);
    }
  },
);
