import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerPriorityController } from './consumer-priority.controller';
import { ConsumerPriorityService } from './consumer-priority.service';

describe('ConsumerPriorityController', () => {
  let controller: ConsumerPriorityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsumerPriorityController],
      providers: [ConsumerPriorityService],
    }).compile();

    controller = module.get<ConsumerPriorityController>(ConsumerPriorityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
