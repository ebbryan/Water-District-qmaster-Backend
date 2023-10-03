import { Module } from '@nestjs/common';
import { TransactionStatusService } from './transaction-status.service';
import { TransactionStatusController } from './transaction-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionStatus } from './entities/transaction-status.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      TransactionStatus
    ])],
  controllers: [TransactionStatusController],
  providers: [TransactionStatusService]
})
export class TransactionStatusModule {}
