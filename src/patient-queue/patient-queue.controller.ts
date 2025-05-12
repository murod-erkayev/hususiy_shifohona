import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';
import { CreatePatientQueueDto } from './dto/create-patient-queue.dto';
import { UpdatePatientQueueDto } from './dto/update-patient-queue.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@Controller('patient-queue')
export class PatientQueueController {
  constructor(private readonly patientQueueService: PatientQueueService) {}

  @Post()
  create(@Body() createPatientQueueDto: CreatePatientQueueDto) {
    return this.patientQueueService.create(createPatientQueueDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.patientQueueService.remove(+id);
  }
}
