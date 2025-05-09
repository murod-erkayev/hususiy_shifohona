import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Is } from "sequelize-typescript";

export class CreateScheduleDto {
    @ApiProperty({example: 1, description: 'ID of the doctor'})
    @IsNumber()
    @IsNotEmpty()
    doctorId:number;
    @ApiProperty({example: '09:00', description: 'Start time of the schedule'})
    @IsNotEmpty()
    @IsString()
    start_time:string;
    @ApiProperty({example: '17:00', description: 'End time of the schedule'})
    @IsNotEmpty()
    @IsString()
    end_time:string;
    @ApiProperty({example: 'Monday', description: 'Week day of the schedule'})
    @IsNotEmpty()
    @IsString()
    week_day:string;
}
