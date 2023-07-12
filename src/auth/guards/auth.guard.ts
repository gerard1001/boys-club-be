import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-core';
import { GlobalClass } from 'src/helpers/global.class';
import { GlobalContext } from 'src/helpers/global.context';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private global: GlobalClass, private context: GlobalContext) {
    super();
  }
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const Authorization = request.get('Authorization');

    this.global.set('token', Authorization);
    this.context.set('token', Authorization);

    if (!Authorization) {
      throw new AuthenticationError('Please login before proceeding!!');
    }

    return request;
  }

  handleRequest(err: any, user: any, info: any) {
    if (err) {
      throw err || new AuthenticationError('Could not authenticate with token');
    }

    return user;
  }
}
