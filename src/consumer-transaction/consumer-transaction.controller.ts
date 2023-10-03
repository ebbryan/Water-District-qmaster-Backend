import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { ConsumerTransactionService } from './consumer-transaction.service';
import { CreateConsumerTransactionDto } from './dto/create-consumer-transaction.dto';
import { UpdateConsumerTransactionDto } from './dto/update-consumer-transaction.dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { EventsGateWay } from 'src/events/events.gateway';
import { ConsumerTransaction } from './entities/consumer-transaction.entity';

@Controller('consumer-transaction')
export class ConsumerTransactionController {
  constructor(
    private readonly consumerTransactionService: ConsumerTransactionService,
    private readonly eventsGateWay: EventsGateWay,
  ) {}

  @Post()
  @Public()
  async create(
    @Body() createConsumerTransactionDto: CreateConsumerTransactionDto,
  ) {
    const newTransaction = await this.consumerTransactionService.create(
      createConsumerTransactionDto,
    );
    this.eventsGateWay.server.emit('transactionCreated', newTransaction);
    return newTransaction;
  }

  @Get('/drop-current-date')
  @Public()
  async findAllDropTransactions(): Promise<ConsumerTransaction[]> {

    return this.consumerTransactionService.findAllDropTransactions();
  }

  @Get('/now-serving-cw')
  @Public()
  async findAllServingTransactions(): Promise<ConsumerTransaction[]> {
    return this.consumerTransactionService.findAllServingTransactions();
  }

  @Get('/now-serving-payment')
  @Public()
  async findAllServingTransactionsPayment(): Promise<ConsumerTransaction[]> {
    return this.consumerTransactionService.findAllServingTransactionsPayment();
  }

  @Get()
  @Public()
  async findAll() {
    return await this.consumerTransactionService.findAll();
  }

  @Get('/transactionstatus')
  @Public()
  async findAllTransactionStatus(
  @Query('transactionStatus') transactionStatus?: string,
  @Query('consumerPriority') consumerPriority?: string,
  @Query('counterPersonnel') counterPersonnel?: string,
  @Query('transactionType') transactionType?: string,
  // @Query('date') date?: string,
  // @Query('startDate') startDate?: string,
  // @Query('endDate') endDate?: string,

) {
  return await this.consumerTransactionService.findAllTransactionStatus(
    transactionStatus,
    consumerPriority,
    counterPersonnel,
    transactionType,
    // date,
    // startDate,
    // endDate,
  );
}

  @Get('/select-transact-by-date')
  @Public()
  async findAllTransactionByDate(
  @Query('subTransactionType') subTransactionType?: string,
  @Query('date') date?: string,
  @Query('startDate') startDate?: string,
  @Query('endDate') endDate?: string,

) {
  return await this.consumerTransactionService.findAllTransactionByDate(
    subTransactionType,
    date,
    startDate,
    endDate,
  );
}

@Get('/transferred')
  @Public()
  async findAllTransferred(
    @Query('transferredFrom') transferredFrom?: string,
  ) {
    return await this.consumerTransactionService.findAllTransferred(
      transferredFrom
    )
  }

  @Get('/current-date-pending-cw')
  @Public()
  async findAllCurrentDatePendingCw() {
    return this.consumerTransactionService.findAllCurrentDatePendingCw();
  }

  @Get('/current-date-pending-cw-latest')
  @Public()
  async findAllCurrentDatePendingCwDesc() {
    return this.consumerTransactionService.findAllCurrentDatePendingCwDesc();
  }

  @Get('/current-date-pending-payment-latest')
  @Public()
  async findAllCurrentDatePendingPaymentDesc() {
    return this.consumerTransactionService.findAllCurrentDatePendingPaymentDesc();
  }

  @Get('/current-date-pending-payment')
  @Public()
  async findAllCurrentDatePendingPayment() {
    return this.consumerTransactionService.findAllCurrentDatePendingPayment();
  }

  @Get(':id')
  @Public()
  async findOne(@Param('id') id: string) {
    return await this.consumerTransactionService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  async update(
    @Param('id') id: string,
    @Body() updateConsumerTransactionDto: UpdateConsumerTransactionDto,
  ) {
    const updatedTransaction = await this.consumerTransactionService.update(
      +id,
      updateConsumerTransactionDto,
    );
    this.eventsGateWay.server.emit(
      'consumerTransactionUpdated',
      updatedTransaction,
    );
    return updatedTransaction;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedTransaction = await this.consumerTransactionService.delete(
      +id,
    );
    this.eventsGateWay.server.emit(
      'consumerTransactionDeleted',
      deletedTransaction,
    );
    return deletedTransaction;
  }
}
