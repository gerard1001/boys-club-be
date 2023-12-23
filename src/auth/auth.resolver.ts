import { Mutation, Resolver, Args } from '@nestjs/graphql';
import {
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { LoginInput, TResponse } from 'src/schema/graphql';
import { AuthService } from './auth.service';
import { UserService } from 'src/common/user/user.service';
import { HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Mutation()
  async loginUser(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<TResponse> {
    const { userName, password } = loginInput;
    const user = await this.userService.getUserByUserName(userName);

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
      userName: user?.userName,
      labels: user?.labels,
    };

    const token = await this.authService.generateJwt(payload);

    return {
      statusCode: HttpStatus.OK,
      message: 'You have successfully logged in',
      data: {
        user: payload,
        token,
      },
    };
  }
}
