import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalStaysService } from './hospital_stays.service';
import { CreateHospitalStayDto } from './dto/create-hospital_stay.dto';
import { UpdateHospitalStayDto } from './dto/update-hospital_stay.dto';

@Controller('hospital-stays')
export class HospitalStaysController {
  constructor(private readonly hospitalStaysService: HospitalStaysService) {}

  @Post()
  create(@Body() createHospitalStayDto: CreateHospitalStayDto) {
    return this.hospitalStaysService.create(createHospitalStayDto);
  }

  @Get()
  findAll() {
    return this.hospitalStaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalStaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalStayDto: UpdateHospitalStayDto) {
    return this.hospitalStaysService.update(+id, updateHospitalStayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalStaysService.remove(+id);
  }
}
