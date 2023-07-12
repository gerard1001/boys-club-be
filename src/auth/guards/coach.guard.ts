import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthenticationError } from 'apollo-server-core';
import { GlobalClass } from 'src/helpers/global.class';
import { PersonService } from 'src/person/person.service';
import { AuthService } from '../auth.service';
import { GlobalContext } from 'src/helpers/global.context';

@Injectable()
export class CoachGuard implements CanActivate {
  constructor(
    private personService: PersonService,
    private authService: AuthService,
    private global: GlobalClass,
    private context: GlobalContext,
  ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token: string = this.context.get('token');
    const user = await this.authService.decodeToken(token);
    const isCoach = await this.personService.isCoach(user?.id);

    if (isCoach) {
      return true;
    }
    throw new AuthenticationError('Only coaches can perform this action.');
  }
}
