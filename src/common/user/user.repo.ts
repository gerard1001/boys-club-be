import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { QueryRepository } from 'src/db/query.repository';
import { UserInput } from 'src/schema/graphql';

@Injectable()
export class UserRepo {
  constructor(
    private readonly queryRepo: QueryRepository,
    private readonly authService: AuthService,
  ) {}

  async createPlayer(userInput: UserInput) {
    const { fullName, userName, age, height, password, image } = userInput;

    const hash = await this.authService.hashPassword(password);

    const user = await this.queryRepo
      .initQuery()
      .raw(
        `
            MERGE (player:Player {userName: '${userName}'})
            ON CREATE SET player.fullName = '${fullName}'
            ON CREATE SET player.age = ${age}
            ON CREATE SET player.height = '${height}'
            ON CREATE SET player.password = '${hash}'
            RETURN player
            `,
      )
      .run();

    if (user.length > 0) {
      const {
        player: { identity, properties },
      } = user[0];

      return {
        id: identity,
        ...properties,
      };
    }
  }

  async seedUsers(data: string): Promise<any> {
    try {
      await this.queryRepo.initQuery().raw(data).run();
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
