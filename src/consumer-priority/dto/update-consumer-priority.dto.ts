import { PartialType } from '@nestjs/mapped-types';
import { CreateConsumerPriorityDto } from './create-consumer-priority.dto';

export class UpdateConsumerPriorityDto extends PartialType(CreateConsumerPriorityDto) {}
