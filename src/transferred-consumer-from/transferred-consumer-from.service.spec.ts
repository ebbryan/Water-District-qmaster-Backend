import { Test, TestingModule } from '@nestjs/testing';
import { TransferredConsumerFromService } from './transferred-consumer-from.service';

describe('TransferredConsumerFromService', () => {
  let service: TransferredConsumerFromService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransferredConsumerFromService],
    }).compile();

    service = module.get<TransferredConsumerFromService>(TransferredConsumerFromService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
