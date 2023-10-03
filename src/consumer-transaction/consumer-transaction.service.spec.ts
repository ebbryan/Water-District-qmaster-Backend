import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerTransactionService } from './consumer-transaction.service';

describe('ConsumerTransactionService', () => {
  let service: ConsumerTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerTransactionService],
    }).compile();

    service = module.get<ConsumerTransactionService>(ConsumerTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
