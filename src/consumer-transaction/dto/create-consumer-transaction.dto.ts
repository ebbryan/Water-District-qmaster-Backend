import { IsDate, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { ConsumerPriority } from 'src/consumer-priority/entities/consumer-priority.entity';
import { CounterPersonnel } from 'src/counter-personnel/entities/counter-personnel.entity';
import { SubTransactionType } from 'src/sub-transaction-type/entities/sub-transaction-type.entity';
import { TransactionStatus } from 'src/transaction-status/entities/transaction-status.entity';
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity';

export class CreateConsumerTransactionDto {
  @IsOptional()
  subTransactionType: SubTransactionType;

  @IsOptional()
  transactionStatus: TransactionStatus;

  @IsOptional()
  transactionType: TransactionType;

  @IsOptional()
  consumerPriority: ConsumerPriority;

  @IsOptional()
  counterPersonnel: CounterPersonnel;

  @IsOptional()
  date: string;

  @IsOptional()
  timeGeneratedQueue: string;

  @IsOptional()
  name: string;

  @IsOptional()
  rng: string;

  @IsOptional()
  timeStartTransaction: string;

  @IsOptional()
  timeEndTransaction: string;

  @IsOptional()
  dropTime: string;

  @IsOptional()
  dropExpiration: string;

  @IsOptional()
  accountNumber: string;

  @IsOptional()
  applicationNumber: string;

}
