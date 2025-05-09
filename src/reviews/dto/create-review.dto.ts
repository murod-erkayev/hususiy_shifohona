import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({ example: 1, description: 'ID of the doctor' })
    @IsNumber()
    @IsNotEmpty()
    doctorId: number;
    @ApiProperty({ example: 1, description: 'ID of the patient' })
    @IsNumber()
    @IsNotEmpty()
    patientId: number;
    @ApiProperty({ example: 5, description: 'Rating of the doctor' })
    @IsNumber()
    @IsNotEmpty()
    rating: number;
    @ApiProperty({ example: 'Great doctor!', description: 'Comment about the doctor' })
    @IsNotEmpty()
    @IsString()
    comment: string;
}
