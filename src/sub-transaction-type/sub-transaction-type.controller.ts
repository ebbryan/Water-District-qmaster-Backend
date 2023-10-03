import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubTransactionTypeService } from './sub-transaction-type.service';
import { CreateSubTransactionTypeDto } from './dto/create-sub-transaction-type.dto';
import { UpdateSubTransactionTypeDto } from './dto/update-sub-transaction-type.dto';
import { EventsGateWay } from 'src/events/events.gateway';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('sub-transaction-type')
export class SubTransactionTypeController {
  constructor(
    private readonly subTransactionTypeService: SubTransactionTypeService,
    private readonly eventsGateWay: EventsGateWay
    ) {}

  @Post()
  async create(@Body() createSubTransactionTypeDto: CreateSubTransactionTypeDto) {
    const newSubTransactionType = await this.subTransactionTypeService.create(createSubTransactionTypeDto);
    this.eventsGateWay.server.emit('subTransactionTypeCreated', newSubTransactionType);
      return newSubTransactionType;
  }

  @Get()
  async findAll(){
    return await this.subTransactionTypeService.findAll();
  }

  @Get('/transaction-type')
  async findTransactionType(
    @Query('transactionType') transactionType?: string,
  ){
    return await this.subTransactionTypeService.findTransactionType(transactionType);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.subTransactionTypeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubTransactionTypeDto: UpdateSubTransactionTypeDto) {
    const updatedSubTransactionType = await this.subTransactionTypeService.update(+id, updateSubTransactionTypeDto);
    this.eventsGateWay.server.emit('subTransactionTypeUpdated', updatedSubTransactionType);
      return updatedSubTransactionType;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedSubTransactionType = await this.subTransactionTypeService.delete(+id);
    this.eventsGateWay.server.emit('subTransactionTypeDeleted', deletedSubTransactionType);
      return deletedSubTransactionType;
  }

}
