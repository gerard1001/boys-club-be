import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { PersonModule } from './person/person.module';
import { Neo4jModule } from './db/neo4j.module';
import { TeamModule } from './team/team.module';
import { AuthModule } from './auth/auth.module';
import { GlobalClass } from './helpers/global.class';
import { PersonController } from './person/person.controller';

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
    PersonModule,
    TeamModule,
  ],
  controllers: [PersonController],
  providers: [AppResolver, GlobalClass],
  exports: [GlobalClass],
})
export class AppModule {}
