import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";


export class addUserDto  {
    
    @ApiProperty()
    @IsString()
    @IsOptional()
    nom  : string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    prenom  : string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    username : string;


    @ApiProperty()
    @IsString()
    @IsOptional()
    motdepasse  : string;

    @ApiProperty({ type: [Number], isArray: true, required: false })
    @IsArray()
    @IsOptional()
    follower: number[] | null;

    @ApiProperty()
    @IsBoolean()
    isactive : boolean
}