import { PartialType } from '@nestjs/swagger';
import { CreateHospitalStayDto } from './create-hospital_stay.dto';

export class UpdateHospitalStayDto extends PartialType(CreateHospitalStayDto) {}
