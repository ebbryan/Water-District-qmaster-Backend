import { PartialType } from '@nestjs/mapped-types';
import { CreateCounterPersonnelDto } from './create-counter-personnel.dto';

export class UpdateCounterPersonnelDto extends PartialType(CreateCounterPersonnelDto) {}
