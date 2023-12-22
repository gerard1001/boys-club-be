import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from 'src/schema/graphql';
import { AuthService } from 'src/auth/auth.service';
import { QueryRepository } from 'src/db/query.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private readonly authService: AuthService,
    private readonly queryRepository: QueryRepository,
    private readonly configService: ConfigService,
  ) {}

  async createUser(userDto: UserDto, filename: string): Promise<User> {
    const { fullName, userName, age, height, team, salary, password, role } =
      userDto;
    const imageUrl: string = `http://localhost:4000/user/profile/${filename}`;
    const hash = await this.authService.hashPassword(password);

    const user = await this.queryRepository
      .initQuery()
      .raw(
        `
        MATCH (team:Team) WHERE ID(team) = ${team}
        MERGE (person:${
          role === 'player' ? 'Player' : 'Coach'
        }  {name: "${fullName}", age: ${age}, height: ${height}, userName: "${userName}", password: "${hash}", image: "${imageUrl}"}) ${
          role === 'player' ? '-[rel:PLAYS_FOR]->' : '-[rel:COACHES]->'
        }   (team)
              ON CREATE SET rel.salary = ${salary}
              ON MATCH SET rel.salary = ${salary}
        RETURN person
    `,
      )
      .run();

    if (user?.length > 0) {
      const {
        person: { identity, properties },
      } = user[0];

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

  async getUserByUserName(userName: string): Promise<any> {
    try {
      const user = await this.queryRepository
        .initQuery()
        .raw(
          `
          MATCH (user {userName: "${userName}"})
          RETURN user
        `,
        )
        .run();

      if (user?.length > 0) {
        const {
          person: { identity, properties, labels },
        } = user[0];

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
}
