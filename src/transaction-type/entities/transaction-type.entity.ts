import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { CounterPersonnel } from "src/counter-personnel/entities/counter-personnel.entity";
import { SubTransactionType } from "src/sub-transaction-type/entities/sub-transaction-type.entity";
import { TransferredConsumerFrom } from "src/transferred-consumer-from/entities/transferred-consumer-from.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => TransferredConsumerFrom, 
    (transferredConsumerFrom) => transferredConsumerFrom.transactionType)
    transferredConsumerFrom: TransferredConsumerFrom[];

    @OneToMany(() => ConsumerTransaction, 
    (consumerTransaction) => consumerTransaction.transactionType)
    consumerTransaction: ConsumerTransaction[];

    @OneToMany(() => CounterPersonnel, 
    (counterPersonnel) => counterPersonnel.transactionType)
    counterPersonnel: CounterPersonnel[];

    @OneToMany(() => SubTransactionType, 
    (subTransactionType) => subTransactionType.transactionType)
    subTransactionType: SubTransactionType[];
}
