import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTransactionTypeDto } from './create-sub-transaction-type.dto';

export class UpdateSubTransactionTypeDto extends PartialType(CreateSubTransactionTypeDto) {}
