import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../common/guards/auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { JwtSelfGuard } from '../common/guards/self.guard';
import { Roles } from '../common/decorators/role.decorator';

@ApiTags('Doctors') 
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Post()
  @ApiOperation({ summary: 'Yangi doktor yaratish' })
  @ApiResponse({ status: 201, description: 'Doktor yaratildi' })
  @ApiBody({ type: CreateDoctorDto })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Get()
  @ApiOperation({ summary: 'Barcha doktorlarni olish' })
  @ApiResponse({ status: 200, description: 'Doktorlar ro‘yxati' })
  findAll() {
    return this.doctorsService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard, JwtSelfGuard)
  @Roles("admin", "superadmin", "doctor")
  @Get(':id')
  @ApiOperation({ summary: 'ID orqali doktorni olish' })
  @ApiResponse({ status: 200, description: 'Doktor topildi' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin", "doctor")
  @Patch(':id')
  @ApiOperation({ summary: 'Doktor maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Doktor yangilandi' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateDoctorDto })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("admin", "superadmin")
  @Delete(':id')
  @ApiOperation({ summary: 'Doktorni o‘chirish' })
  @ApiResponse({ status: 200, description: 'Doktor o‘chirildi' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string) {
    return this.doctorsService.remove(+id);
  }
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.doctorsService.activateDoctor(link);
  }

}
