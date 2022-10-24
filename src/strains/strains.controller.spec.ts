import { Test, TestingModule } from '@nestjs/testing';
import { StrainsController } from './strains.controller';
import { StrainsService } from './strains.service';

describe('StrainsController', () => {
  let controller: StrainsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StrainsController],
      providers: [StrainsService],
    }).compile();

    controller = module.get<StrainsController>(StrainsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
