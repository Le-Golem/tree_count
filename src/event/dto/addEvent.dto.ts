import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { UserEntity } from "src/user/entity/user.entity";

export class addEventDto  {
    
    @ApiProperty()
    @IsString()
    Label  : string;

    @ApiProperty()
    @IsString()
    description  : string;

    @ApiProperty({isArray: true, required: false })
    @IsArray()
    @IsOptional()
    usersToParticipate: number[];

    @ApiProperty({ description: 'Is active status', default: true })
    @IsBoolean()
    isActive: boolean;

}