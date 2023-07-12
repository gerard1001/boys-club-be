import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Team, TeamInput, TeamOpponent } from 'src/schema/graphql';
import { TeamService } from './team.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { CoachGuard } from 'src/auth/guards/coach.guard';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation()
  // @UseGuards(JwtAuthGuard, CoachGuard)
  async createTeam(@Args('teamInput') teamInput: TeamInput): Promise<Team> {
    return await this.teamService.createTeam(teamInput);
  }

  @Mutation()
  async setTeamPlayedAgainst(
    @Args('teamOpponent') teamOpponent: TeamOpponent,
  ): Promise<boolean> {
    return await this.teamService.setTeamPlayedAgainst(teamOpponent);
  }

  @Query()
  async getTeam(@Args('id') id: number): Promise<Team> {
    return await this.teamService.getTeam(id);
  }

  @Query()
  @UseGuards(AuthGuard('jwt'))
  async getTeams(): Promise<Team[]> {
    return await this.teamService.getTeams();
  }
}
