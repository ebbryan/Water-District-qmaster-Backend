import { Test, TestingModule } from '@nestjs/testing';
import { SubTransactionTypeController } from './sub-transaction-type.controller';
import { SubTransactionTypeService } from './sub-transaction-type.service';

describe('SubTransactionTypeController', () => {
  let controller: SubTransactionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubTransactionTypeController],
      providers: [SubTransactionTypeService],
    }).compile();

    controller = module.get<SubTransactionTypeController>(SubTransactionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
