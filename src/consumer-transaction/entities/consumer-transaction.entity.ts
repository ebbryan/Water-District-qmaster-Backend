import { ConsumerPriority } from 'src/consumer-priority/entities/consumer-priority.entity';
import { CounterPersonnel } from 'src/counter-personnel/entities/counter-personnel.entity';
import { SubTransactionType } from 'src/sub-transaction-type/entities/sub-transaction-type.entity';
import { TransactionStatus } from 'src/transaction-status/entities/transaction-status.entity';
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity';
import { TransferredConsumerFrom } from 'src/transferred-consumer-from/entities/transferred-consumer-from.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ConsumerTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  rng: string;

  @ManyToOne(
    () => SubTransactionType,
    (subTransactionType) => subTransactionType.consumerTransaction,
    { nullable: true },
  )
  subTransactionType: SubTransactionType;

  @ManyToOne(
    () => TransactionStatus,
    (transactionStatus) => transactionStatus.consumerTransaction,
    { nullable: true },
  )
  transactionStatus: TransactionStatus;

  @ManyToOne(
    () => TransactionType,
    (transactionType) => transactionType.consumerTransaction,
    { nullable: true },
  )
  transactionType: TransactionType;

  @ManyToOne(
    () => ConsumerPriority,
    (consumerPriority) => consumerPriority.consumerTransaction,
    { nullable: true },
  )
  consumerPriority: ConsumerPriority;

  @ManyToOne(
    () => CounterPersonnel,
    (counterPersonnel) => counterPersonnel.consumerTransaction,
    { nullable: true },
  )
  counterPersonnel: CounterPersonnel;

  @OneToMany(() => TransferredConsumerFrom, 
    (transferredConsumer) => transferredConsumer.consumerTransaction)
    transferredConsumerFrom: TransferredConsumerFrom[];

  @CreateDateColumn({ type: 'date', nullable: true })
  date: string;

  @CreateDateColumn({ type: 'time', nullable: true })
  timeGeneratedQueue: Date;

  @CreateDateColumn({ type: 'time', nullable: true })
  timeStartTransaction: Date;

  @CreateDateColumn({ type: 'time', nullable: true })
  timeEndTransaction: Date;

  @CreateDateColumn({ type: 'time', nullable: true })
  dropTime: Date;

  @CreateDateColumn({ type: 'time', nullable: true })
  dropExpiration: Date;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  applicationNumber: string;

}