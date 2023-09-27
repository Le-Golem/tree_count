import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";


export class SignInDto  {
    
    @ApiProperty()
    @IsString()
    username  : string;

    @ApiProperty()
    @IsString()
    motdepasse  : string;

   
}