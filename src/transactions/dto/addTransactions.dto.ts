import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class addTransactionsDto {
  @ApiProperty({
    description: 'Date format: YYYY-MM-DD',
    default: new Date().toISOString().split('T')[0],
  })
  @IsDate()
  @Transform(({ value }) => new Date(value))
  date: Date;

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
