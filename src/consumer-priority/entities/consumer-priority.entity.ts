import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConsumerPriority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => ConsumerTransaction, 
    (consumerTransaction) => consumerTransaction.consumerPriority)
    consumerTransaction: ConsumerTransaction[];
}
