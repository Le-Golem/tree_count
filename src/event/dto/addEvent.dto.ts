import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class addEventDto {
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