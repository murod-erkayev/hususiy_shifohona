import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Doctors') 
@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}
  @Post()
  @ApiOperation({ summary: 'Yangi doktor yaratish' })
  @ApiResponse({ status: 201, description: 'Doktor yaratildi' })
  @ApiBody({ type: CreateDoctorDto })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }
  @Get()
  @ApiOperation({ summary: 'Barcha doktorlarni olish' })
  @ApiResponse({ status: 200, description: 'Doktorlar ro‘yxati' })
  findAll() {
    return this.doctorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ID orqali doktorni olish' })
  @ApiResponse({ status: 200, description: 'Doktor topildi' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string) {
    return this.doctorsService.findOne(+id);
  }
  @Patch(':id')
  @ApiOperation({ summary: 'Doktor maʼlumotlarini yangilash' })
  @ApiResponse({ status: 200, description: 'Doktor yangilandi' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateDoctorDto })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(+id, updateDoctorDto);
  }

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
