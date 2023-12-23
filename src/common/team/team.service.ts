import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/db/query.repository';
import { Team, TeamInput } from 'src/schema/graphql';
import { TeamRepo } from './team.repo';

@Injectable()
export class TeamService {
  constructor(private readonly teamRepo: TeamRepo) {}

  async createTeam(teamInput: TeamInput): Promise<Team> {
    try {
      return await this.teamRepo.createTeam(teamInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTeams(): Promise<Team[]> {
    try {
      return await this.teamRepo.getTeams();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTeam(id: string): Promise<Team> {
    try {
      return await this.teamRepo.getTeam(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
