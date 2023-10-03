import { Module } from '@nestjs/common';
import { SubTransactionTypeService } from './sub-transaction-type.service';
import { SubTransactionTypeController } from './sub-transaction-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubTransactionType } from './entities/sub-transaction-type.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      SubTransactionType
    ])],
  controllers: [SubTransactionTypeController],
  providers: [SubTransactionTypeService]
})
export class SubTransactionTypeModule {}
