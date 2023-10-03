import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConsumerPriorityService } from './consumer-priority.service';
import { CreateConsumerPriorityDto } from './dto/create-consumer-priority.dto';
import { UpdateConsumerPriorityDto } from './dto/update-consumer-priority.dto';
import { EventsGateWay } from 'src/events/events.gateway';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('consumer-priority')
export class ConsumerPriorityController {
  constructor(
    private readonly consumerPriorityService: ConsumerPriorityService,
    private readonly eventsGateWay: EventsGateWay
    ) {}

  @Post()
  async create(@Body() createConsumerPriorityDto: CreateConsumerPriorityDto) {
    const newConsumerPriority = await this.consumerPriorityService.create(createConsumerPriorityDto);
    this.eventsGateWay.server.emit('consumerPriorityCreated', newConsumerPriority);
      return newConsumerPriority;
  }

  @Get()
  async findAll() {
    return await this.consumerPriorityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.consumerPriorityService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateConsumerPriorityDto: UpdateConsumerPriorityDto) {
    const updatedConsumerPriority = await this.consumerPriorityService.update(+id, updateConsumerPriorityDto);
    this.eventsGateWay.server.emit('consumerPriorityUpdated', updatedConsumerPriority);
      return updatedConsumerPriority;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedConsumerPriority = await this.consumerPriorityService.delete(+id);
    this.eventsGateWay.server.emit('consumerPriorityDeleted', deletedConsumerPriority);
      return deletedConsumerPriority;
  }

}
