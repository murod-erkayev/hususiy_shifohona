import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsPhoneNumber, IsSemVer, IsString } from "class-validator";
import { IsEmail } from "sequelize-typescript";

export class CreateDoctorDto {
    @ApiProperty({ example: "John Doe", description: "Full name of the doctor" })
    @IsString()
    @IsNotEmpty()
    full_name: string;
    @ApiProperty({ example: "+1234567890",  description: "Phone number of the doctor" })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone_number: string;
    @ApiProperty({ example:"murodjon@gmail.com", description: "Email of the doctor" })
    @IsString()
    @IsNotEmpty()
    email: string;
    @ApiProperty({ example: "password123", description: "Password of the doctor" })
    @IsString()
    @IsNotEmpty()
    password_hash: string;
    @ApiProperty({ example: "Cardiologist", description: "Specialization of the doctor" })
    @IsString()
    @IsNotEmpty()
    specialization:string
    @ApiProperty({ example: "Cardiologist", description: "Specialization of the doctor" })
    @IsString()
    @IsNotEmpty() 
    confirm_password: string;
    @ApiProperty({ example: "5 years", description: "Experience of the doctor" })
    @IsString()
    @IsNotEmpty()
    experience: string;
    @ApiProperty({ example: "Harvard University", description: "Education of the doctor" })
    @IsString()
    @IsNotEmpty()
    education: string;
    @ApiProperty({ example: "Cardiologist with 5 years of experience", description: "Bio of the doctor" })
    @IsString()
    @IsNotEmpty()
    bio: string;
    @ApiProperty({ example: "https://example.com/image.jpg", description: "Image of the doctor" })
    @IsString()
    @IsNotEmpty()
    img: string;
    @ApiProperty({ example: "false", description: "Is the doctor active?" })
    is_active: boolean;
    @ApiProperty({ example: "123 Main St, City, Country", description: "Address of the doctor" })
    @IsString()
    @IsNotEmpty()
    address: string;
    @ApiProperty({ example: "1", description: "Department ID of the doctor" })
    @IsNumber()
    @IsNotEmpty()
    departmentId: number;

    role:string
}
