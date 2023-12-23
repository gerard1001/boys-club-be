
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
    Team = "Team",
    Match = "Match",
    League = "League",
    Season = "Season",
    Stadium = "Stadium",
    Referee = "Referee",
    Goal = "Goal"
}

export enum Relations {
    BELONGS_TO = "BELONGS_TO",
    COACHES = "COACHES"
}

export class LeagueInput {
    name: string;
    start_date: string;
    end_date: string;
}

export class TeamInput {
    name: string;
    country: string;
    coach?: Nullable<string>;
}

export class UserInput {
    fullName?: Nullable<string>;
    userName: string;
    age?: Nullable<number>;
    password: string;
    height?: Nullable<number>;
    team?: Nullable<string>;
    salary?: Nullable<number>;
    image?: Nullable<string>;
}

export class LoginInput {
    userName: string;
    password: string;
}

export class League {
    id: string;
    name: string;
    start_date: string;
    end_date: string;
}

export abstract class IQuery {
    abstract getLeague(id: string): Nullable<League> | Promise<Nullable<League>>;

    abstract getLeagues(): Nullable<Nullable<League>[]> | Promise<Nullable<Nullable<League>[]>>;

    abstract getTeam(id: string): Nullable<Team> | Promise<Nullable<Team>>;

    abstract getTeams(): Nullable<Nullable<Team>[]> | Promise<Nullable<Nullable<Team>[]>>;

    abstract getPlayersInTeam(id: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;

    abstract welcomeMsg(): Nullable<string> | Promise<Nullable<string>>;

    abstract getUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract getCoaches(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class IMutation {
    abstract createLeague(leagueInput: LeagueInput): League | Promise<League>;

    abstract createTeam(teamInput: TeamInput): Team | Promise<Team>;

    abstract createUser(userInput: UserInput): User | Promise<User>;

    abstract updateUser(id: string, userInput: UserInput): User | Promise<User>;

    abstract deleteUser(id: string): Nullable<boolean> | Promise<Nullable<boolean>>;

    abstract loginUser(loginInput?: Nullable<LoginInput>): TResponse | Promise<TResponse>;
}

export class Team {
    id: string;
    name: string;
    country: string;
}

export class User {
    id: string;
    fullName: string;
    userName: string;
    password: string;
    age: number;
    height?: Nullable<number>;
    image?: Nullable<string>;
    labels?: Nullable<Nullable<string>[]>;
}

export class TResponse {
    statusCode: number;
    message: string;
    data?: Nullable<JSON>;
}

export type JSON = any;
type Nullable<T> = T | null;
