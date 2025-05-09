import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator"

export class CreatePatientDto {
    @ApiProperty({ example: "John Doe", description: "Full name of the patient" })
    @IsString()
    @IsNotEmpty()
    full_name:string
    @ApiProperty({ example: "+1234567890",  description: "Phone number of the patient" })
    @IsString()
    @IsNotEmpty()
    @IsPhoneNumber("UZ")
    phone_number:string
    @ApiProperty({ example:"murojon@gmial.com", description: "Email of the patient" })
    @IsString()
    @IsNotEmpty()
    email:string
    @ApiProperty({ example: "password123", description: "Password of the patient" })
    @IsString()
    @IsNotEmpty()
    password_hash:string
    @ApiProperty({ example: "password123", description: "Password of the patient" })
    @IsString()
    @IsNotEmpty()
    address:string
    @ApiProperty({ example: "password123", description: "Password of the patient" })
    @IsString()
    @IsNotEmpty()
    confirm_password:string
    @ApiProperty({ example: "27-07-2005", description: "Brithday You" })
    @IsString()
    @IsNotEmpty()
    brith_day:string
    @ApiProperty({ example: "A+", description: "Blood group of the patient" })
    @IsString()
    @IsNotEmpty()
    blood_group:string
    @ApiProperty({ example: "None", description: "Allergies of the patient" })
    @IsString()
    @IsNotEmpty()
    allergies:string
    @ApiProperty({ example: "Cardiologist with 5 years of experience", description: "Bio of the patient" })
    @IsString()
    @IsNotEmpty()
    bio:string
    @ApiProperty({ example: "https://example.com/image.jpg", description: "Image of the patient" })
    is_active:boolean
    
    role:string
}
