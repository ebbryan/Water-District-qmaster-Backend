import { Test, TestingModule } from '@nestjs/testing';
import { TransferredConsumerFromController } from './transferred-consumer-from.controller';
import { TransferredConsumerFromService } from './transferred-consumer-from.service';

describe('TransferredConsumerFromController', () => {
  let controller: TransferredConsumerFromController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransferredConsumerFromController],
      providers: [TransferredConsumerFromService],
    }).compile();

    controller = module.get<TransferredConsumerFromController>(TransferredConsumerFromController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
