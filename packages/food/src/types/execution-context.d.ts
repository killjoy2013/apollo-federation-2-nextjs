// eslint-disable-next-line unused-imports/no-unused-imports
import { ExecutionContext } from '@nestjs/common';

export type ExecutionContextSession = {
  username: any;
  rights: any;
};

declare module '@nestjs/common' {
  interface ExecutionContext {
    session: ExecutionContextSession;
  }
}
