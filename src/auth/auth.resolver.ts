import { Mutation, Resolver, Args } from '@nestjs/graphql';
import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { LoginInput, LoginResult } from 'src/schema/graphql';
import { PersonService } from 'src/person/person.service';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(
    private personService: PersonService,
    private authService: AuthService,
  ) {}

  @Mutation()
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<LoginResult> {
    const { email, password } = loginInput;
    const user = await this.personService.getPlayerByEmail(email);
    const isRealPwd = await this.authService.comparePassword(
      password,
      user?.password,
    );

    if (!user) {
      throw new NotFoundException();
    }
    if (!isRealPwd) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: user?.id,
      email: user?.email,
      labels: user?.labels,
    };

    const token = await this.authService.generateJwt(payload);

    return {
      message: 'You have successfully logged in',
      token,
    };
  }
}
