import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class addTransactionsDto {

    @ApiProperty()
    @IsString()
    Label : string ;

    @ApiProperty()
    @IsNumber()
    solde : number;

    @ApiProperty()
    @IsNumber()
    userId : number;

}