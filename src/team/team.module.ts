import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalClass } from 'src/helpers/global.class';
import { PersonService } from 'src/person/person.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { PersonModule } from 'src/person/person.module';
import { GlobalContext } from 'src/helpers/global.context';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
    forwardRef(() => PersonModule),
  ],
  providers: [
    TeamService,
    TeamResolver,
    JwtStrategy,
    GlobalClass,
    GlobalContext,
    Map,
  ],
  exports: [TeamService, GlobalClass],
})
export class TeamModule {}
