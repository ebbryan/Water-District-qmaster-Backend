import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { TransactionType } from "src/transaction-type/entities/transaction-type.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubTransactionType {
    @PrimaryGeneratedColumn({ name: 'subTransactionType' })
    id: number;
    
    @Column()
    name: string;

    @OneToMany(() => ConsumerTransaction, (consumerTransaction) => consumerTransaction.subTransactionType)
    consumerTransaction: ConsumerTransaction[];

    @ManyToOne (() => TransactionType, (transactionType) => transactionType.subTransactionType)
    transactionType: TransactionType;
}
