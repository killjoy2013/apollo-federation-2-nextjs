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

    console.log('rights', rights);

    const username = ctx.username;
    // const rights = user.rights as string[];
    if (!rights.includes(fieldName)) {
      console.log(`You must have ${fieldName} right`);
      throw new UnauthorizedException(`You must have ${fieldName} right`);
    }
  },
);
