import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerPriorityService } from './consumer-priority.service';

describe('ConsumerPriorityService', () => {
  let service: ConsumerPriorityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerPriorityService],
    }).compile();

    service = module.get<ConsumerPriorityService>(ConsumerPriorityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
