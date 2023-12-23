import { Module } from '@nestjs/common';
import { LeagueService } from './league.service';
import { LeagueResolver } from './league.resolver';
import { LeagueRepo } from './league.repo';

@Module({
  controllers: [],
  providers: [LeagueResolver, LeagueService, LeagueRepo],
})
export class LeagueModule {}
