import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';
import { CreatePatientQueueDto } from './dto/create-patient-queue.dto';
import { UpdatePatientQueueDto } from './dto/update-patient-queue.dto';

@Controller('patient-queue')
export class PatientQueueController {
  constructor(private readonly patientQueueService: PatientQueueService) {}

  @Post()
  create(@Body() createPatientQueueDto: CreatePatientQueueDto) {
    return this.patientQueueService.create(createPatientQueueDto);
  }

  @Get()
  findAll() {
    return this.patientQueueService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.patientQueueService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePatientQueueDto: UpdatePatientQueueDto) {
    return this.patientQueueService.update(+id, updatePatientQueueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientQueueService.remove(+id);
  }
}
