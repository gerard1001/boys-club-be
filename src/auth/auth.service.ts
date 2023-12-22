import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { LoginInput, LoginResult } from 'src/schema/graphql';
import * as bcrypt from 'bcrypt';
import { GlobalClass } from 'src/helpers/global.class';
import { GlobalContext } from 'src/helpers/global.context';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private global: GlobalClass,
    private context: GlobalContext,
  ) {}

  async generateJwt(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async decodeToken(token: string): Promise<any> {
    const user = this.jwtService.decode(token);

    if (user) {
      this.global.set('user', user);
    }
    return user;
  }

  async hashPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }
}
