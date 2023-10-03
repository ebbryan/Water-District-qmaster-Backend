import { Module } from '@nestjs/common';
import { TransactionTypeService } from './transaction-type.service';
import { TransactionTypeController } from './transaction-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionType } from './entities/transaction-type.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      TransactionType
    ])],
  controllers: [TransactionTypeController],
  providers: [TransactionTypeService],
  exports: [TransactionTypeService]
})
export class TransactionTypeModule {}