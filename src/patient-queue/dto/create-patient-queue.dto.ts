import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsPositive, IsNotEmpty } from 'class-validator';

export class CreatePatientQueueDto {
  @ApiProperty({
    description: 'ID of the department where the patient queue belongs',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  departmentId: number;

  @ApiProperty({
    description: 'Queue number assigned to the patient',
    type: Number,
    example: 100,
  })
  @IsInt()
  @IsNotEmpty()
  queue_number: number;

  @ApiProperty({
    description: 'Status of the queue (1 - active, 0 - completed)',
    type: Number,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  status: number;
}
