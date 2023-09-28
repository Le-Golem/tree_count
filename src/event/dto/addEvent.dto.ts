import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class addEventDto  {
    
    @ApiProperty()
    @IsString()
    Label  : string;

    @ApiProperty()
    @IsString()
    description  : string;

    @ApiProperty({ type: [Number], isArray: true, required: false })
    @IsArray()
    @IsOptional()
    users: number[] | null;

    @ApiProperty({ description: 'Is active status', default: true })
    @IsBoolean()
    isActive: boolean;

}