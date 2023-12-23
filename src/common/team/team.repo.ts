import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { QueryRepository } from 'src/db/query.repository';
import { Team, TeamInput } from 'src/schema/graphql';

@Injectable()
export class TeamRepo {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createTeam(teamInput: TeamInput): Promise<Team> {
    const { name, country } = teamInput;

    const team = await this.queryRepository
      .initQuery()
      .raw(
        `
        MERGE (team:Team {name: '${name}'})
        ON CREATE SET team.country = '${country}'
        RETURN team
    `,
      )
      .run();

    if (team?.length > 0) {
      const {
        team: { identity, properties },
      } = team[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async getTeams(): Promise<Team[]> {
    try {
      const teams = await this.queryRepository
        .initQuery()
        .raw(
          `
        MATCH (team:Team) RETURN team 
      `,
        )
        .run();

      if (teams.length > 0) {
        const resultArray = [];

        for (let i = 0; i < teams.length; i++) {
          const obj = {};
          obj['id'] = teams[i].team.identity;
          obj['name'] = teams[i].team.properties.name;
          obj['country'] = teams[i].team.properties.country;

          resultArray.push(obj);
        }

        return resultArray;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTeam(id: string): Promise<Team> {
    const team = await this.queryRepository
      .initQuery()
      .raw(
        `
            MATCH (team:Team) WHERE ID(team) = ${id}
            RETURN team
        `,
      )
      .run();

    if (team?.length > 0) {
      const {
        team: { identity, properties },
      } = team[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }
}
