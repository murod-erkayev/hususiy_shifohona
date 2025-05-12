import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@Controller('prescription')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Post()
  create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return this.prescriptionService.create(createPrescriptionDto);
  }
  @Get()
  findAll() {
    return this.prescriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionDto: UpdatePrescriptionDto) {
    return this.prescriptionService.update(+id, updatePrescriptionDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionService.remove(+id);
  }
}
