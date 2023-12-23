import { Module, forwardRef } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamResolver } from './team.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { GlobalClass } from 'src/helpers/global.class';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { GlobalContext } from 'src/helpers/global.context';
import { TeamRepo } from './team.repo';

@Module({
  imports: [ConfigModule, forwardRef(() => AuthModule)],
  providers: [
    TeamService,
    TeamResolver,
    JwtStrategy,
    GlobalClass,
    GlobalContext,
    TeamRepo,
    Map,
  ],
  exports: [TeamService, GlobalClass],
})
export class TeamModule {}
