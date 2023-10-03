import { IsInt, IsOptional, IsString } from "class-validator";
import { TransactionType } from "src/transaction-type/entities/transaction-type.entity";

export class CreateSubTransactionTypeDto {
    @IsOptional()
    name: string;

    @IsOptional()
    transactionType: TransactionType;
}