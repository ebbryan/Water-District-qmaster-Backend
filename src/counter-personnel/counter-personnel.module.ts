import { Module } from '@nestjs/common';
import { CounterPersonnelService } from './counter-personnel.service';
import { CounterPersonnelController } from './counter-personnel.controller';
import { CounterPersonnel } from './entities/counter-personnel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionTypeModule } from 'src/transaction-type/transaction-type.module';
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    TransactionTypeModule,
    EventsModule,
    TypeOrmModule.forFeature([
      CounterPersonnel, 
      TransactionType
    ])],
  controllers: [CounterPersonnelController],
  providers: [CounterPersonnelService],
  exports: [CounterPersonnelService]
})
export class CounterPersonnelModule {}
