import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: 'Bemorning umumiy ahvoli yaxshi, ammo ko‘krak qafasida og‘riq bor.',
    description: 'Bemorning kuzatuv holati yoki alomatlari',
  })
  @IsString({ message: 'observation matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'observation bo‘sh bo‘lmasligi kerak' })
  observation: string;

  @ApiProperty({
    example: 'Qorinda og‘riq va ishtahani yo‘qotish',
    description: 'Bemorning tashxisi',
  })
  @IsString({ message: 'diagnosis matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'diagnosis bo‘sh bo‘lmasligi kerak' })
  diagnosis: string;

  @ApiProperty({
    example: 3,
    description: "Uchrashuv ID (Appointment jadvalidan)",
  })
  @IsInt({ message: 'appointmentId butun son bo‘lishi kerak' })
  appointmentId: number;

  @ApiProperty({
    example: 7,
    description: "Retsept ID (Prescription jadvalidan)",
  })
  @IsInt({ message: 'prescriptionId butun son bo‘lishi kerak' })
  prescriptionId: number;
}

