import { IsNotEmpty, IsEmail } from 'class-validator';

export class PersonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  team: string;

  @IsNotEmpty()
  salary: number;
}
