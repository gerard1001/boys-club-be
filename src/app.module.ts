import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { Neo4jModule } from './db/neo4j.module';
import { AuthModule } from './auth/auth.module';
import { GlobalClass } from './helpers/global.class';
import { UserModule } from './common/user/user.module';
import { TeamModule } from './common/team/team.module';
import { MatchModule } from './common/match/match.module';
import { LeagueModule } from './common/league/league.module';
import { SeasonModule } from './common/season/season.module';
import { StadiumModule } from './common/stadium/stadium.module';
import { GoalModule } from './common/goal/goal.module';
import { MigrationModule } from './db/migrations/migration.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      typePaths: ['./**/*.graphql'],
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    Neo4jModule.forRootAsync(),
    AuthModule,
    TeamModule,
    UserModule,
    MatchModule,
    LeagueModule,
    SeasonModule,
    StadiumModule,
    MigrationModule,
    GoalModule,
  ],
  providers: [AppResolver, GlobalClass],
  exports: [GlobalClass],
})
export class AppModule {}
