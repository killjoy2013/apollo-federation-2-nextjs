import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class RightGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const fieldName = context.getHandler().name;
    const ctx = GqlExecutionContext.create(context).getContext();
    const rights = ctx.rights;

    if (!rights || !rights.includes(fieldName)) {
      throw new UnauthorizedException(`You must have ${fieldName} right`);
    }

    return true;
  }
}
