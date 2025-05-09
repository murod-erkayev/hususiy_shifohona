  import { ApiProperty } from '@nestjs/swagger';
  import { IsDateString, IsInt, IsPositive } from 'class-validator';

  export class CreateHospitalStayDto {
    @ApiProperty({ example: '2025-05-08', description: 'Kasalxona yotqizilgan sana (boshlanish)' })
    @IsDateString({}, { message: 'start_date noto‘g‘ri formatda. YYYY-MM-DD bo‘lishi kerak' })
    start_date: string;

    @ApiProperty({ example: '2025-05-12', description: 'Kasalxona yotqizilgan sana (tugash)' })
    @IsDateString({}, { message: 'end_date noto‘g‘ri formatda. YYYY-MM-DD bo‘lishi kerak' })
    end_date: string;

    @ApiProperty({ example: 3, description: 'Kundalik dori miqdori yoki xizmat miqdori' })
    @IsInt({ message: 'daily_quantity butun son bo‘lishi kerak' })
    daily_quantity: number;

    @ApiProperty({ example: 1, description: 'Tegishli tibbiy karta IDsi' })
    @IsInt({ message: 'medical_recordId butun son bo‘lishi kerak' })
    medical_recordId: number;
  }
