import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor", "doctor")
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor", "doctor")
  @Get()
  findAll() {
    return this.medicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMedicationDto: UpdateMedicationDto) {
    return this.medicationsService.update(+id, updateMedicationDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
