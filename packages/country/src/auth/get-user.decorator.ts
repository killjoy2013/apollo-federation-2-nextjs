import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    // const fieldName = context.getHandler().name;
    // const ctx = GqlExecutionContext.create(context).getContext();
    // const user = ctx.user;
    // const rights = user.rights as string[];
    // if (!rights.includes(fieldName)) {
    //   console.log(`You must have ${fieldName} right`);
    //   throw new UnauthorizedException(`You must have ${fieldName} right`);
    // }
    // return user;
  },
);
