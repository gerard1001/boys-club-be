import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { QueryRepository } from 'src/db/query.repository';
import { GlobalClass } from 'src/helpers/global.class';
import { Person, PersonInput, PersonTeamInput } from 'src/schema/graphql';
import { PersonDto } from './dto/person.dto';

@Injectable()
export class PersonService {
  constructor(
    private readonly queryRepository: QueryRepository,
    private global: GlobalClass,
    private authService: AuthService,
  ) {}

  async createPlayer(personInput: PersonInput): Promise<Person> {
    const { name, age, height, team, salary, email, password, image } =
      personInput;

    const hash = await this.authService.hashPassword(password);

    const player = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${team}
        MERGE (person:Player {name: "${name}", age: ${age}, height: ${height}, email: "${email}", password: "${hash}"}) -[rel:PLAYS_FOR]-> (team)
              ON CREATE SET rel.salary = ${salary}
              ON MATCH SET rel.salary = ${salary}
        RETURN person
    `,
      )
      .run();

    if (player?.length > 0) {
      const {
        person: { identity, properties },
      } = player[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async createPostmanPlayer(
    personDto: PersonDto,
    filename: string,
  ): Promise<Person> {
    const { name, age, height, team, salary, email, password } = personDto;
    const imageUrl: string = `http://localhost:4000/user/profile/${filename}`;
    const hash = await this.authService.hashPassword(password);

    const player = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${team}
        MERGE (person:Player {name: "${name}", age: ${age}, height: ${height}, email: "${email}", password: "${hash}", image: "${imageUrl}"}) -[rel:PLAYS_FOR]-> (team)
              ON CREATE SET rel.salary = ${salary}
              ON MATCH SET rel.salary = ${salary}
        RETURN person
    `,
      )
      .run();

    if (player?.length > 0) {
      const {
        person: { identity, properties },
      } = player[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async createCoach(personInput: PersonInput): Promise<Person> {
    const { age, name, salary, team, height, email, password } = personInput;

    const hash = await this.authService.hashPassword(password);

    const coach = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${team}
        MERGE (person:Coach {name: "${name}", age: ${age}, email: "${email}", password: "${hash}"}) -[rel:COACHES]-> (team)
              ON CREATE SET rel.salary = ${salary}
        RETURN person
      `,
      )
      .run();

    if (coach?.length > 0) {
      const {
        person: { identity, properties },
      } = coach[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async fetchPlayer(id: string): Promise<Person> {
    const token = this.global.token;
    const player = await this.queryRepository
      .initQuery()
      .raw(
        `
            MATCH (person) 
            WHERE ID(person) = ${id}
            RETURN person
        `,
      )
      .run();

    if (player?.length > 0) {
      const {
        person: { identity, properties },
      } = player[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async getPlayerByEmail(email: string): Promise<any> {
    try {
      const player = await this.queryRepository
        .initQuery()
        .raw(
          `
        MATCH (person {email: "${email}"})
        RETURN person
      `,
        )
        .run();

      if (player?.length > 0) {
        const {
          person: { identity, properties, labels },
        } = player[0];

        return {
          id: identity,
          ...properties,
          labels,
        };
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getPlayersInTeam(id: string): Promise<Person[]> {
    const players = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (team:Team) WHERE ID(team) = ${id}
      MATCH (players:Player) -[:PLAYS_FOR]-> (team)
      RETURN players
    `,
      )
      .run();

    if (players?.length > 0) {
      var playerList = [];

      for (let i = 0; i < players.length; i++) {
        const obj = {};

        obj['id'] = players[i].players.identity;
        obj['name'] = players[i].players.properties.name;
        obj['email'] = players[i].players.properties.email;
        obj['password'] = players[i].players.properties.password;
        obj['age'] = players[i].players.properties.age;
        obj['height'] = players[i].players.properties.height;
        obj['image'] = players[i].players.properties.image;

        playerList.push(obj);
      }

      return playerList;
    }
  }

  async updatePlayerTeam(personTeamInput: PersonTeamInput): Promise<boolean> {
    const { personId, teamId, salary } = personTeamInput;
    const teamPlayer = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${teamId}
        MATCH (player:Player) WHERE ID(player) = ${personId}
        MERGE (player) -[pf:PLAYS_FOR]-> (team)
              ON MATCH SET pf.salary = ${salary}  
              ON CREATE SET pf.salary = ${salary}  
        RETURN player,
               team
      `,
      )
      .run();

    if (teamPlayer?.length > 0) {
      return true;
    }
  }

  async deletePerson(id: string): Promise<boolean> {
    const deletedUser = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (pers) WHERE ID(pers) = ${id}
        DETACH DELETE pers
        RETURN pers
      `,
      )
      .run();

    return true;
  }

  async updatePlayer(id: string, personInput: PersonInput): Promise<Person> {
    const { age, name, height, salary, team } = personInput;

    const newPlayer = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (player:Player) WHERE ID(player) = ${id}
      MATCH (team:Team) WHERE ID(team) = ${team}
      MERGE (player) -[rel:PLAYS_FOR]-> (team)
      SET player.name = CASE WHEN "${name}" IS NOT NULL THEN "${name}" ELSE player.name END,
          player.age = CASE WHEN ${age} IS NOT NULL THEN ${age} ELSE player.age END,
          player.height = CASE WHEN ${height} IS NOT NULL THEN ${height} ELSE player.height END,
          rel.salary = CASE WHEN ${salary} IS NOT NULL THEN ${salary} ELSE rel.salary END

      RETURN player
    `,
      )
      .run();

    if (newPlayer?.length > 0) {
      const {
        player: { identity, properties },
      } = newPlayer[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async isCoach(id: string): Promise<boolean | string> {
    const user = await this.queryRepository
      .initQuery()
      .raw(
        `
      MATCH (pers) WHERE ID(pers) = ${id}
      RETURN pers
    `,
      )
      .run();

    if (user?.length > 0) {
      const {
        pers: { identity, properties, labels },
      } = user[0];

      if (labels.includes('Coach')) {
        return true;
      }
      return false;
    }
  }

  async testApi() {
    return {
      message: 'Test My Api!',
    };
  }

  async saveImage(filename: string) {
    const imageUrl: string = `http://localhost:4000/user/profile/${filename}`;

    const query = await this.queryRepository
      .initQuery()
      .raw(
        `
      MERGE (user:User {image: "${imageUrl}"})
      RETURN user
    `,
      )
      .run();

    console.log(query[0]);

    if (query.length > 0) {
      return true;
    }
  }
}
