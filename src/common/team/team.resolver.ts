import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Team, TeamInput } from 'src/schema/graphql';
import { TeamService } from './team.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class TeamResolver {
  constructor(private readonly teamService: TeamService) {}

  @Mutation()
  async createTeam(@Args('teamInput') teamInput: TeamInput): Promise<Team> {
    return await this.teamService.createTeam(teamInput);
  }

  @Query()
  async getTeam(@Args('id') id: string): Promise<Team> {
    return await this.teamService.getTeam(id);
  }

  @Query()
  @UseGuards(AuthGuard('jwt'))
  async getTeams(): Promise<Team[]> {
    return await this.teamService.getTeams();
  }
}
