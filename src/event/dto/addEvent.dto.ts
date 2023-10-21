import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
} from 'class-validator';

export class addEventDto {
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
  @IsString()
  description: string;

  @ApiProperty({ isArray: true, required: false })
  @IsArray()
  @IsOptional()
  usersToParticipate: number[];

  @ApiProperty({ description: 'Is active status', default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
