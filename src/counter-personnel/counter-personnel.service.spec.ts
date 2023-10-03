import { Test, TestingModule } from '@nestjs/testing';
import { CounterPersonnelService } from './counter-personnel.service';

describe('CounterPersonnelService', () => {
  let service: CounterPersonnelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CounterPersonnelService],
    }).compile();

    service = module.get<CounterPersonnelService>(CounterPersonnelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
