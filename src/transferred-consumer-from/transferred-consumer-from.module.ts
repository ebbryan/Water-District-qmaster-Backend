import { Module } from '@nestjs/common';
import { TransferredConsumerFromService } from './transferred-consumer-from.service';
import { TransferredConsumerFromController } from './transferred-consumer-from.controller';
import { EventsModule } from 'src/events/events.module';
import { TransferredConsumerFrom } from './entities/transferred-consumer-from.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      TransferredConsumerFrom
    ])],
  controllers: [TransferredConsumerFromController],
  providers: [TransferredConsumerFromService]
})
export class TransferredConsumerFromModule {}
