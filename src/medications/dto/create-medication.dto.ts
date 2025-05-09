import { ApiProperty } from "@nestjs/swagger"
import { isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateMedicationDto {
    @ApiProperty({ example: "Paracetamol", description: "Name of the medication" })
    @IsString()
    @IsNotEmpty()
    name:string
    @ApiProperty({ example: "Tablet", description: "Type of the medication" })
    @IsString()
    @IsNotEmpty()
    type:string
    @ApiProperty({ example: 100, description: "Price of the medication" })
    @IsNotEmpty()
    @IsNumber()
    price:number
    @ApiProperty({ example: 50, description: "Quantity of the medication" })
    @IsNotEmpty()
    @IsNumber()
    quantity:number
    @ApiProperty({ example: "Pain reliever", description: "Description of the medication" })
    @IsString()
    @IsNotEmpty()
    description:string
}
