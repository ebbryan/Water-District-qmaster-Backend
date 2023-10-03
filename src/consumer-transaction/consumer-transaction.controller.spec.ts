import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerTransactionController } from './consumer-transaction.controller';
import { ConsumerTransactionService } from './consumer-transaction.service';

describe('ConsumerTransactionController', () => {
  let controller: ConsumerTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerTransactionController],
      providers: [ConsumerTransactionService],
    }).compile();

    controller = module.get<ConsumerTransactionController>(ConsumerTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
