import { IsOptional, IsString } from "class-validator";

export class CreateTransactionTypeDto {
    @IsOptional()
    name: string;
}
