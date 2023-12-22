import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly height: number;

  @IsNotEmpty()
  readonly age: number;

  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly team: string;

  @IsNotEmpty()
  readonly salary: number;

  @IsNotEmpty()
  readonly role: string;
}
