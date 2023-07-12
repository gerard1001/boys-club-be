
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Labels {
    Player = "Player",
    Coach = "Coach",
    Team = "Team"
}

export enum Relations {
    PLAYS_FOR = "PLAYS_FOR",
    COACHES = "COACHES",
    MANAGES = "MANAGES"
}

export class PersonInput {
    name?: Nullable<string>;
    age?: Nullable<number>;
    email: string;
    password: string;
    height?: Nullable<number>;
    team?: Nullable<string>;
    salary?: Nullable<number>;
    image?: Nullable<string>;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PersonTeamInput {
    personId: string;
    teamId: string;
    salary?: Nullable<number>;
}

export class TeamInput {
    name: string;
    city: string;
}

export class DateScore {
    date?: Nullable<string>;
    score?: Nullable<string>;
}

export class TeamOpponent {
    teamId: string;
    opponentId: string;
    dateScore?: Nullable<DateScore>;
}

export interface JwtPayload {
    id?: Nullable<string>;
    email?: Nullable<string>;
    labels?: Nullable<Nullable<string>[]>;
}

export class FileType {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export class Person {
    id: string;
    name: string;
    email: string;
    password: string;
    age: number;
    height?: Nullable<number>;
    image?: Nullable<string>;
}

export class LoginResult {
    message?: Nullable<string>;
    token?: Nullable<string>;
}

export class ResponseSingleUpload {
    url?: Nullable<string>;
}

export abstract class IQuery {
    abstract welcomeMsg(): Nullable<string> | Promise<Nullable<string>>;

    abstract getPerson(id: string): Nullable<Person> | Promise<Nullable<Person>>;

    abstract getCoaches(): Nullable<Nullable<Person>[]> | Promise<Nullable<Nullable<Person>[]>>;

    abstract getTeam(id: string): Nullable<Team> | Promise<Nullable<Team>>;

    abstract getTeams(): Nullable<Nullable<Team>[]> | Promise<Nullable<Nullable<Team>[]>>;

    abstract getPlayersInTeam(id: string): Nullable<Nullable<Person>[]> | Promise<Nullable<Nullable<Person>[]>>;
}

export abstract class IMutation {
    abstract createPlayer(personInput: PersonInput): Person | Promise<Person>;

    abstract updatePlayer(id: string, personInput: PersonInput): Person | Promise<Person>;

    abstract createCoach(personInput: PersonInput): Person | Promise<Person>;

    abstract updatePlayerTeam(personTeamInput: PersonTeamInput): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract deletePerson(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract uploadSingleFiles(file: Upload): Nullable<ResponseSingleUpload> | Promise<Nullable<ResponseSingleUpload>>;

    abstract loginUser(loginInput?: Nullable<LoginInput>): Nullable<LoginResult> | Promise<Nullable<LoginResult>>;

    abstract createTeam(teamInput: TeamInput): Team | Promise<Team>;

    abstract setTeamPlayedAgainst(teamOpponent?: Nullable<TeamOpponent>): Nullable<boolean> | Promise<Nullable<boolean>>;
}

export class Team {
    id: string;
    name: string;
    city: string;
}

export type Upload = any;
type Nullable<T> = T | null;
