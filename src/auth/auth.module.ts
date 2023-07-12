import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersonModule } from 'src/person/person.module';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TeamModule } from 'src/team/team.module';
import { GlobalContext } from 'src/helpers/global.context';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options: JwtModuleOptions = {
          secret: configService.get('JWT_SECRET'),
        };

        const expiresIn = configService.get('EXPIRES_IN');
        if (expiresIn) {
          options.signOptions = {
            expiresIn,
          };
        }

        return options;
      },

      inject: [ConfigService],
    }),
    forwardRef(() => TeamModule),
    forwardRef(() => PersonModule),
    ConfigModule,
  ],
  providers: [AuthService, AuthResolver, GlobalContext, Map],
  exports: [AuthService],
})
export class AuthModule {}
