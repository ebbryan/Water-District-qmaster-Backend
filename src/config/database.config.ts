import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConsumerPriority } from "src/consumer-priority/entities/consumer-priority.entity";
import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { CounterPersonnel } from "src/counter-personnel/entities/counter-personnel.entity";
import { SubTransactionType } from "src/sub-transaction-type/entities/sub-transaction-type.entity";
import { TransactionStatus } from "src/transaction-status/entities/transaction-status.entity";
import { TransactionType } from "src/transaction-type/entities/transaction-type.entity";
import { TransferredConsumerFrom } from "src/transferred-consumer-from/entities/transferred-consumer-from.entity";

export class DatabaseConfig implements TypeOrmOptionsFactory{
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            logging: true,
            autoLoadEntities: true,
            synchronize: true,
            // entities: [
            //     ConsumerPriority,
            //     ConsumerTransaction,
            //     CounterPersonnel,
            //     SubTransactionType,
            //     TransactionStatus,
            //     TransactionType,
            //     TransferredConsumerFrom,
            // ],
        };
    }
}