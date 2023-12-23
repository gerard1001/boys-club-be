import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/db/query.repository';
import { League, LeagueInput } from 'src/schema/graphql';

@Injectable()
export class LeagueRepo {
  constructor(private readonly queryRepo: QueryRepository) {}

  async createLeague(leagueInput: LeagueInput) {
    const { name, start_date, end_date } = leagueInput;

    const league = await this.queryRepo
      .initQuery()
      .raw(
        `
        MERGE (league:League {name: '${name}'})
        ON CREATE SET league.start_date = '${start_date}', league.end_date = '${end_date}'
        RETURN league
    `,
      )
      .run();

    if (league?.length > 0) {
      const {
        league: { identity, properties },
      } = league[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async getLeagues() {
    const leagues = await this.queryRepo
      .initQuery()
      .raw(
        `
        MATCH (league:League) RETURN league 
      `,
      )
      .run();

    if (leagues.length > 0) {
      const resultArray = [];

      for (let i = 0; i < leagues.length; i++) {
        const obj = {};
        obj['id'] = leagues[i].league.identity;
        obj['name'] = leagues[i].league.properties.name;
        obj['start_date'] = leagues[i].league.properties.start_date;
        obj['end_date'] = leagues[i].league.properties.end_date;

        resultArray.push(obj);
      }

      return resultArray;
    }
  }

  async getLeague(id: number): Promise<League> {
    const league = await this.queryRepo
      .initQuery()
      .raw(
        `
            MATCH (league:League) WHERE ID(league) = ${id}
            RETURN league
        `,
      )
      .run();

    if (league?.length > 0) {
      const {
        league: { identity, properties },
      } = league[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }
}
