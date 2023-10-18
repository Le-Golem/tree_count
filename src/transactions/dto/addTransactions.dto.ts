import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class addTransactionsDto {
  @ApiProperty()
  @IsString()
  label: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNumber()
  senderId: number;

  @ApiProperty()
  @IsNumber()
  eventId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  receiverId: number;
}
