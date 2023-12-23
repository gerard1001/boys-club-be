import { Module, forwardRef } from '@nestjs/common';
import { UserSeed } from './seeds/user.seed';
import { UserModule } from 'src/common/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommandModule } from 'nestjs-command';
import { Neo4jModule } from '../neo4j.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    Neo4jModule.forRootAsync(),
    CommandModule,
    AuthModule,
    UserModule,
  ],
  providers: [UserSeed],
})
export class MigrationModule {}
