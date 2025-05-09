import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali Valiyev', description: 'To‘liq ism' })
  @IsString()
  @IsNotEmpty({ message: 'Full name bo‘sh bo‘lishi mumkin emas' })
  full_name: string;

  @ApiProperty({ example: '+998901234567', description: 'Telefon raqam' })
  @IsString()
  @Matches(/^\+998\d{9}$/, {
    message: 'Telefon raqam formati noto‘g‘ri. Masalan: +998901234567',
  })
  phone_number: string;

  @ApiProperty({ example: 'admin@example.com', description: 'Email manzil' })
  @IsEmail({}, { message: 'Email manzil noto‘g‘ri' })
  email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Parol' })
  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak' })
  password_hash: string;

  @ApiProperty({ example: 'StrongP@ssw0rd', description: 'Parolni tasdiqlash' })
  @IsString()
  @MinLength(6, { message: 'Tasdiqlovchi parol ham kamida 6 ta belgidan iborat bo‘lishi kerak' })
  confirm_password: string;

  @ApiProperty({ example: 'admin', description: 'Foydalanuvchi roli' })
  @IsString()
  @IsNotEmpty({ message: 'Rol bo‘sh bo‘lishi mumkin emas' })
  role: string;

  is_active:boolean
}
