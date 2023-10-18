import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class updateEventDto {
  @ApiProperty()
  @IsNumber()
  eventId: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  label: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ description: 'Is active status', default: true })
  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
