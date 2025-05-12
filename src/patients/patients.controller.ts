import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { JwtSelfGuard } from '../common/guards/self.guard';
import { JwtAuthGuard } from '../common/guards/user.guard';

@ApiTags('Patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({ status: 201, description: 'Patient successfully created' })
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get()
  @ApiOperation({ summary: 'Get all patients' })
  @ApiResponse({ status: 200, description: 'List of patients' })
  findAll() {
    return this.patientsService.findAll();
  }
// Activation 
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.patientsService.activatePatien(link);
  }
  @UseGuards(JwtAuthGuard,RolesGuard, JwtSelfGuard)
  @Roles("admin","superadmin","patient")
  @Get(':id')
  @ApiOperation({ summary: 'Get a patient by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Patient data' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","superadmin","patient")
  @Patch(':id')
  @ApiOperation({ summary: 'Update a patient by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Patient successfully updated' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  update(
    @Param('id') id: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("admin","superadmin","patient")
  @Delete(':id')
  @ApiOperation({summary: 'Delete a patient by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Patient successfully deleted' })
  @ApiResponse({ status: 404, description: 'Patient not found' })
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
