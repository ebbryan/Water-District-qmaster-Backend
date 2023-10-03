import { Test, TestingModule } from '@nestjs/testing';
import { SubTransactionTypeService } from './sub-transaction-type.service';

describe('SubTransactionTypeService', () => {
  let service: SubTransactionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubTransactionTypeService],
    }).compile();

    service = module.get<SubTransactionTypeService>(SubTransactionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
