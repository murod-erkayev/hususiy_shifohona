import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsString, IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 3,
    description: "Shifokor ID raqami (doctor jadvalidan)",
  })
  @IsInt({ message: 'doctorId butun son bo‘lishi kerak' })
  @IsPositive({ message: 'doctorId musbat son bo‘lishi kerak' })
  doctorId: number;

  @ApiProperty({
    example: 7,
    description: "Bemor ID raqami (patient jadvalidan)",
  })
  @IsInt({ message: 'patientId butun son bo‘lishi kerak' })
  @IsPositive({ message: 'patientId musbat son bo‘lishi kerak' })
  patientId: number;

  @ApiProperty({
    example: 'pending',
    description: "Uchrashuv holati (masalan: pending, approved, cancelled)",
  })
  @IsString({ message: 'status matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'status bo‘sh bo‘lmasligi kerak' })
  status: string;

  @ApiProperty({
    example: 'Qorindagi og‘riq uchun maslahat',
    description: "Uchrashuv maqsadi",
  })
  @IsString({ message: 'purpose matn bo‘lishi kerak' })
  @IsNotEmpty({ message: 'purpose bo‘sh bo‘lmasligi kerak' })
  purpose: string;
}
