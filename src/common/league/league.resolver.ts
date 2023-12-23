import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { League, LeagueInput } from 'src/schema/graphql';
import { LeagueService } from './league.service';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { createLeagueValidation } from 'src/validations/league.validation';

@Resolver()
export class LeagueResolver {
  constructor(private readonly leagueService: LeagueService) {}

  @Mutation()
  @UsePipes(new ValidationPipe(createLeagueValidation))
  async createLeague(@Args('leagueInput') leagueInput: LeagueInput) {
    return await this.leagueService.createLeague(leagueInput);
  }

  @Query()
  async getLeague(@Args('id') id: number): Promise<League> {
    return await this.leagueService.getLeague(id);
  }

  @Query()
  async getLeagues(): Promise<League[]> {
    return await this.leagueService.getLeagues();
  }
}
