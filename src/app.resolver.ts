import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query()
  welcomeMsg(): string {
    return 'Hello World!';
  }
}
