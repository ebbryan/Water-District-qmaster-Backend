import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionStatusService } from './transaction-status.service';
import { CreateTransactionStatusDto } from './dto/create-transaction-status.dto';
import { UpdateTransactionStatusDto } from './dto/update-transaction-status.dto';
import { EventsGateWay } from 'src/events/events.gateway';

@Controller('transaction-status')
export class TransactionStatusController {
  constructor(
    private readonly transactionStatusService: TransactionStatusService,
    private readonly eventsGateWay: EventsGateWay
    ) {}

  @Post()
  async create(@Body() createTransactionStatusDto: CreateTransactionStatusDto) {
    const newTransactionStatus = await this.transactionStatusService.create(createTransactionStatusDto);
    this.eventsGateWay.server.emit('transactionStatusCreated', newTransactionStatus);
      return newTransactionStatus;
  }

  @Get()
  async findAll() {
    return await this.transactionStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionStatusService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTransactionStatusDto: UpdateTransactionStatusDto) {
    const updatedTransactionStatus = await this.transactionStatusService.update(+id, updateTransactionStatusDto);
    this.eventsGateWay.server.emit('transactionStatusUpdated', updatedTransactionStatus);
      return updatedTransactionStatus;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTransactionStatus = await this.transactionStatusService.delete(+id);
    this.eventsGateWay.server.emit('transactionStatusDeleted', deletedTransactionStatus);
      return deletedTransactionStatus;
  }

}
