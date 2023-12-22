import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { GlobalClass } from 'src/helpers/global.class';
import { AuthService } from '../auth.service';
import { GlobalContext } from 'src/helpers/global.context';
import { UserService } from 'src/common/user/user.service';

@Injectable()
export class CoachGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private global: GlobalClass,
    private context: GlobalContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const token: string = this.context.get('token');
    const user = await this.authService.decodeToken(token);
    const isCoach = await this.userService.isCoach(user?.id);

    if (isCoach) {
      return true;
    }
    throw new AuthenticationError('Only coaches can perform this action.');
  }
}
