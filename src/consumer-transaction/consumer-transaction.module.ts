import { Module } from '@nestjs/common';
import { ConsumerTransactionService } from './consumer-transaction.service';
import { ConsumerTransactionController } from './consumer-transaction.controller';
import { ConsumerTransaction } from './entities/consumer-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      ConsumerTransaction
    ])
  ],
  controllers: [ConsumerTransactionController],
  providers: [ConsumerTransactionService]
})
export class ConsumerTransactionModule {}
