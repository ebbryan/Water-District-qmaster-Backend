import { IsOptional, IsString } from "class-validator";

export class CreateTransactionStatusDto {
    @IsOptional()
    name: string;
}
