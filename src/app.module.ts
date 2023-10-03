import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConsumerTransactionModule } from './consumer-transaction/consumer-transaction.module';
import { SubTransactionTypeModule } from './sub-transaction-type/sub-transaction-type.module';
import { TransactionTypeModule } from './transaction-type/transaction-type.module';
import { TransactionStatusModule } from './transaction-status/transaction-status.module';
import { CounterPersonnelModule } from './counter-personnel/counter-personnel.module';
import { ConsumerPriorityModule } from './consumer-priority/consumer-priority.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './config/database.config';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { EventsGateWay } from './events/events.gateway';
import { TransferredConsumerFromModule } from './transferred-consumer-from/transferred-consumer-from.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    AuthModule,
    ConsumerTransactionModule,
    SubTransactionTypeModule, 
    TransactionTypeModule, 
    TransactionStatusModule, 
    CounterPersonnelModule, 
    ConsumerPriorityModule, 
    EventsModule,
    TransferredConsumerFromModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateWay],
})
export class AppModule {}
