import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionTypeService } from './transaction-type.service';
import { CreateTransactionTypeDto } from './dto/create-transaction-type.dto';
import { UpdateTransactionTypeDto } from './dto/update-transaction-type.dto';
import { EventsGateWay } from 'src/events/events.gateway';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('transaction-type')
export class TransactionTypeController {
  constructor(
    private readonly transactionTypeService: TransactionTypeService,
    private readonly eventsGateWay: EventsGateWay
    ) {}

  @Post()
  async create(@Body() createTransactionTypeDto: CreateTransactionTypeDto) {
    const newTransactionType = await this.transactionTypeService.create(createTransactionTypeDto);
    this.eventsGateWay.server.emit('transactionTypeCreated', newTransactionType);
      return newTransactionType;
  }

  @Get()
  @Public()
  async findAll() {
    return await this.transactionTypeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.transactionTypeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTransactionTypeDto: UpdateTransactionTypeDto) {
    const updatedTransactionType = await this.transactionTypeService.update(+id, updateTransactionTypeDto);
    this.eventsGateWay.server.emit('transactionTypeUpdated', updatedTransactionType);
      return updatedTransactionType;
  }
  
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTransactionType = await this.transactionTypeService.delete(+id);
    this.eventsGateWay.server.emit('transactionTypeDeleted', deletedTransactionType);
      return deletedTransactionType;
  }

}
