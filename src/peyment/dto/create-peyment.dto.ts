import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsIn, IsOptional, Min } from 'class-validator';

export class CreatePeymentDto {
  @ApiProperty({ example: 1, description: 'Bemorning ID raqami' })
  @IsNumber()
  pateintId: number;

  @ApiProperty({ example: 50000, description: 'To‘lov summasi so‘mda' })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'cash', description: 'To‘lov turi: cash, card, click va hokazo' })
  @IsString()
  type: string;

  @ApiProperty({ example: 'pending', description: 'To‘lov holati: pending, paid, failed' })
  @IsString()
  status: string;

  @ApiProperty({ example: 'To‘lov izohi', required: false })
  @IsOptional()
  @IsString()
  description: string;
}
