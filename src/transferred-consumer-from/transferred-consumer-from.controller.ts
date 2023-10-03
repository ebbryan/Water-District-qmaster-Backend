import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TransferredConsumerFromService } from './transferred-consumer-from.service';
import { CreateTransferredConsumerFromDto } from './dto/create-transferred-consumer-from.dto';
import { UpdateTransferredConsumerFromDto } from './dto/update-transferred-consumer-from.dto';
import { EventsGateWay } from 'src/events/events.gateway';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('transferred-consumer-from')
export class TransferredConsumerFromController {
  constructor(
    private readonly transferredConsumerFromService: TransferredConsumerFromService,
    private readonly eventGateWay: EventsGateWay,
    ) {}

  @Post()
  @Public()
  async create(@Body() createTransferredConsumerFromDto: CreateTransferredConsumerFromDto) {
    const newTransferredConsumerFrom = await this.transferredConsumerFromService.create(createTransferredConsumerFromDto);
    this.eventGateWay.server.emit('transferredConsumerFromCreated', newTransferredConsumerFrom);
    return newTransferredConsumerFrom;
  }

  @Get()
  @Public()
  findAll() {
    return this.transferredConsumerFromService.findAll();
  }

  @Get('/transfer-from')
  @Public()
  async findAllTransactionType(
  @Query('transactionType') transactionType?: string,
  @Query('transactionFrom') transactionFrom?: string,
  ) {
  return await this.transferredConsumerFromService.findAllTransactionType(
    transactionType,
    transactionFrom
  );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transferredConsumerFromService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTransferredConsumerFromDto: UpdateTransferredConsumerFromDto) {
    const updateTransferredConsumerFrom = await this.transferredConsumerFromService.update(+id, updateTransferredConsumerFromDto);
    this.eventGateWay.server.emit('transferredConsumerFromUpdated', updateTransferredConsumerFrom);
    return updateTransferredConsumerFrom;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteTransferredFromConsumer = await this.transferredConsumerFromService.delete(+id);
    this.eventGateWay.server.emit('transferredConsumerFromDeleted', deleteTransferredFromConsumer);
    return deleteTransferredFromConsumer;
  }

}
