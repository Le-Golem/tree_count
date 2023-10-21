import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsArray()
  @Type(() => Number)
  @IsOptional()
  receiverId: number[];
}
