import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { TransactionType } from "src/transaction-type/entities/transaction-type.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransferredConsumerFrom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    transactionNote: string;

    @ManyToOne (() => ConsumerTransaction, (consumerTransaction) => consumerTransaction.transferredConsumerFrom)
    consumerTransaction: ConsumerTransaction;

    @ManyToOne(() => TransactionType, (transactionType) => transactionType.transferredConsumerFrom, { nullable: true })
    transactionType: TransactionType;

    @Column()
    transactionFrom: string;

}