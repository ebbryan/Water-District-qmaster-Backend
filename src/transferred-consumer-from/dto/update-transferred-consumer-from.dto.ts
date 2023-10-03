import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferredConsumerFromDto } from './create-transferred-consumer-from.dto';

export class UpdateTransferredConsumerFromDto extends PartialType(CreateTransferredConsumerFromDto) {}
