import { IsOptional, IsString } from "class-validator";

export class CreateConsumerPriorityDto {
    @IsOptional()
    name: string;
}
