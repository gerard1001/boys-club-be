// import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import {
//   LoginInput,
//   Person,
//   PersonInput,
//   PersonTeamInput,
//   Team,
// } from 'src/schema/graphql';
// import { PersonService } from './person.service';
// import { JwtService } from '@nestjs/jwt';
// import {
//   NotFoundException,
//   UnauthorizedException,
//   UseGuards,
// } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
// import { GlobalClass } from 'src/helpers/global.class';
// import { AuthService } from 'src/auth/auth.service';
// import { CoachGuard } from 'src/auth/guards/coach.guard';
// import { GlobalContext } from 'src/helpers/global.context';

// @Resolver()
// export class PersonResolver {
//   constructor(
//     private personService: PersonService,
//     private configService: ConfigService,
//     private authService: AuthService,
//     private context: GlobalContext,
//   ) {}

//   @Mutation()
//   async createPlayer(
//     @Args('personInput') personInput: PersonInput,
//   ): Promise<Person> {
//     return await this.personService.createPlayer(personInput);
//   }

//   @Mutation()
//   async createCoach(
//     @Args('personInput') personInput: PersonInput,
//   ): Promise<Person> {
//     return await this.personService.createCoach(personInput);
//   }

//   @Query()
//   @UseGuards(JwtAuthGuard, CoachGuard)
//   async getPerson(@Args('id') id: string): Promise<Person> {
//     const token: string = await this.context.get('token');
//     const user = await this.authService.decodeToken(token);

//     return await this.personService.fetchPlayer(id);
//   }

//   @Query()
//   async getPlayersInTeam(@Args('id') id: string): Promise<Person[]> {
//     return await this.personService.getPlayersInTeam(id);
//   }

//   @Mutation()
//   async updatePlayerTeam(
//     @Args('personTeamInput') personTeamInput: PersonTeamInput,
//   ): Promise<boolean> {
//     return await this.personService.updatePlayerTeam(personTeamInput);
//   }

//   @Mutation()
//   async deletePerson(@Args('id') id: string): Promise<boolean> {
//     return await this.personService.deletePerson(id);
//   }

//   @Mutation()
//   async updatePlayer(
//     @Args('id') id: string,
//     @Args('personInput') personInput: PersonInput,
//   ): Promise<Person> {
//     return await this.personService.updatePlayer(id, personInput);
//   }
// }
