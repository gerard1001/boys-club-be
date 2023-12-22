import { Module } from '@nestjs/common';
import { StadiumController } from './stadium.controller';

@Module({
  controllers: [StadiumController]
})
export class StadiumModule {}
