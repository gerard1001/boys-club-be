import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LeagueInput } from 'src/schema/graphql';
import { LeagueRepo } from './league.repo';

@Injectable()
export class LeagueService {
  constructor(private readonly leagueRepo: LeagueRepo) {}

  async createLeague(leagueInput: LeagueInput) {
    try {
      return await this.leagueRepo.createLeague(leagueInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLeagues() {
    try {
      return await this.leagueRepo.getLeagues();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLeague(id: number) {
    try {
      return await this.leagueRepo.getLeague(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
