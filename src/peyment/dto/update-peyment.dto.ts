import { PartialType } from '@nestjs/swagger';
import { CreatePeymentDto } from './create-peyment.dto';

export class UpdatePeymentDto extends PartialType(CreatePeymentDto) {}
