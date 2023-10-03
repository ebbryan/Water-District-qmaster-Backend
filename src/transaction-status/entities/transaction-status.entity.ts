import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionStatus {
    @PrimaryGeneratedColumn({ name: 'transactionStatus' })
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ConsumerTransaction, 
    (consumerTransaction) => consumerTransaction.transactionStatus)
    consumerTransaction: ConsumerTransaction[];
}
