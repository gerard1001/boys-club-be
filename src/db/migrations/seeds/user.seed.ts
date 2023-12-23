import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { AuthService } from 'src/auth/auth.service';
import { UserRepo } from 'src/common/user/user.repo';

@Injectable()
export class UserSeed {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepo: UserRepo,
  ) {}

  @Command({
    command: 'seed:user',
    describe: 'seed users',
  })
  async seeds(): Promise<void> {
    const dataString = `
        CREATE (user1:Admin {userName: 'admin1', fullName: 'Admin One', password: '${await this.authService.hashPassword(
          'pass123',
        )}' })
        CREATE (user2:Admin {userName: 'admin2', fullName: 'Admin Two', password: '${await this.authService.hashPassword(
          'pass123',
        )}' })
        `;

    try {
      await this.userRepo.seedUsers(dataString);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Command({
    command: 'remove:user',
    describe: 'remove users',
  })
  async remove(): Promise<void> {
    const dataString = `
    MATCH (user:Admin) DETACH DELETE user
    `;
    try {
      await this.userRepo.seedUsers(dataString);
    } catch (error: any) {
      throw new Error(error.message);
    }

    return;
  }
}
