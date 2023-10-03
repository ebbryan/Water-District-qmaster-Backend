import { Test, TestingModule } from '@nestjs/testing';
import { CounterPersonnelController } from './counter-personnel.controller';
import { CounterPersonnelService } from './counter-personnel.service';

describe('CounterPersonnelController', () => {
  let controller: CounterPersonnelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounterPersonnelController],
      providers: [CounterPersonnelService],
    }).compile();

    controller = module.get<CounterPersonnelController>(CounterPersonnelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
