import { Module, forwardRef } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/auth/auth.module';
import { GlobalClass } from 'src/helpers/global.class';
import { TeamResolver } from 'src/team/team.resolver';
import { TeamService } from 'src/team/team.service';
import { TeamModule } from 'src/team/team.module';
import { GlobalContext } from 'src/helpers/global.context';
import multer from 'multer';
import { PersonController } from './person.controller';

@Module({
  imports: [
    ConfigModule,
    forwardRef(() => AuthModule),
    forwardRef(() => TeamModule),
  ],
  providers: [
    PersonService,
    PersonResolver,
    JwtStrategy,
    GlobalClass,
    GlobalContext,
    Map,
  ],
  exports: [PersonService, GlobalClass],
  controllers: [PersonController],
})
export class PersonModule {}
