import { IsOptional } from "class-validator";
import { ConsumerTransaction } from "src/consumer-transaction/entities/consumer-transaction.entity";
import { TransactionType } from "src/transaction-type/entities/transaction-type.entity";

export class CreateTransferredConsumerFromDto {
    @IsOptional()
    transactionNote: string;

    @IsOptional()
    consumerTransaction: ConsumerTransaction;

    @IsOptional()
    transactionType: TransactionType;
    
    @IsOptional()
    transactionFrom: string;
}