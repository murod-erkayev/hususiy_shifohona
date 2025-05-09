import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CreatePrescriptionDto {
  @ApiProperty({
    example: 1,
    description: 'Dori vositasi IDsi (medication jadvalidan)',
  })
  @IsInt({ message: 'medicationId butun son bo‘lishi kerak' })
  medicationId: number;

  @ApiProperty({
    example: 'Kuniga 2 mahal ovqatdan keyin',
    description: 'Dorini qanday ishlatish bo‘yicha ko‘rsatma',
  })
  @IsString({ message: 'instructions matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'instructions bo‘sh bo‘lmasligi kerak' })
  instructions: string;

  @ApiProperty({
    example: 'Qorindagi og‘riqlar uchun yozilgan dori',
    description: 'Qo‘shimcha tavsif yoki eslatma',
  })
  @IsString({ message: 'description matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'description bo‘sh bo‘lmasligi kerak' })
  description: string;
}
