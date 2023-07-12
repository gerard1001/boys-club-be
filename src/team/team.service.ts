import { Injectable } from '@nestjs/common';
import { QueryRepository } from 'src/db/query.repository';
import { Team, TeamInput, TeamOpponent } from 'src/schema/graphql';

@Injectable()
export class TeamService {
  constructor(private readonly queryRepository: QueryRepository) {}

  async createTeam(teamInput: TeamInput): Promise<Team> {
    const { name, city } = teamInput;

    const team = await this.queryRepository
      .initQuery()
      .raw(
        `
        CREATE (team:Team {name: "${name}", city: "${city}"})
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
          obj['city'] = teams[i].team.properties.city;

          resultArray.push(obj);
        }

        return resultArray;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getTeam(id: number): Promise<Team> {
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

  async setTeamPlayedAgainst(teamOpponent: TeamOpponent): Promise<boolean> {
    const {
      opponentId,
      teamId,
      dateScore: { date, score },
    } = teamOpponent;
    const newTeams = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${teamId}
        MATCH (opponent:Team) WHERE ID(opponent) = ${opponentId}
        MERGE (team) -[rel:PLAYED_AGAINST]-> (opponent)
            ON CREATE SET rel.date = "${date}"
            ON CREATE SET rel.score = "${score}"
        RETURN rel, team, opponent
    `,
      )
      .run();

    return true;
  }
}
