import { Module } from '@nestjs/common';
import { ConsumerPriorityService } from './consumer-priority.service';
import { ConsumerPriorityController } from './consumer-priority.controller';
import { ConsumerPriority } from './entities/consumer-priority.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [
    EventsModule,
    TypeOrmModule.forFeature([
      ConsumerPriority]
      )],
  controllers: [ConsumerPriorityController],
  providers: [ConsumerPriorityService]
})
export class ConsumerPriorityModule {}
