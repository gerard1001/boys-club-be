import { Test, TestingModule } from '@nestjs/testing';
import { LeagueController } from './league.resolver';

describe('LeagueController', () => {
  let controller: LeagueController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeagueController],
    }).compile();

    controller = module.get<LeagueController>(LeagueController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
