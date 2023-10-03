// import { IsBoolean } from 'class-validator';
import { IsBoolean, IsOptional } from 'class-validator';
import { TransactionType } from 'src/transaction-type/entities/transaction-type.entity';

export class CreateCounterPersonnelDto {
    @IsOptional()
  transactionType: TransactionType;

    @IsOptional()
  firstname: string;

    @IsOptional()
  lastname: string;

    @IsOptional()
  username: string;

    @IsOptional()
  password: string;

    @IsOptional()
  tag: string;

    @IsBoolean()
  isActive: boolean;
}
