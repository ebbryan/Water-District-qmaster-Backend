import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerTransactionDto } from './create-consumer-transaction.dto';

export class UpdateConsumerTransactionDto extends PartialType(CreateConsumerTransactionDto) {}
