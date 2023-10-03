import { Exclude } from 'class-transformer';
import { ConsumerTransaction } from 'src/consumer-transaction/entities/consumer-transaction.entity';
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CounterPersonnel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  tag: string;

  @Column()
  isActive: boolean;

  @OneToMany(
    () => ConsumerTransaction,
    (consumerTransaction) => consumerTransaction.counterPersonnel,
  )
  consumerTransaction: ConsumerTransaction[];

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.counterPersonnel,
  )
  transactionType: TransactionType;
}
