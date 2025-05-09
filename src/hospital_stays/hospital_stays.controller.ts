import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { HospitalStaysService } from './hospital_stays.service';
import { CreateHospitalStayDto } from './dto/create-hospital_stay.dto';
import { UpdateHospitalStayDto } from './dto/update-hospital_stay.dto';
import { JwtAuthGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';

@Controller('hospital-stays')
export class HospitalStaysController {
  constructor(private readonly hospitalStaysService: HospitalStaysService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Post()
  create(@Body() createHospitalStayDto: CreateHospitalStayDto) {
    return this.hospitalStaysService.create(createHospitalStayDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Get()
  findAll() {
    return this.hospitalStaysService.findAll();
  }
    @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin", "doctor")
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalStaysService.findOne(+id);
  }
    @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalStayDto: UpdateHospitalStayDto) {
    return this.hospitalStaysService.update(+id, updateHospitalStayDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin", "admin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalStaysService.remove(+id);
  }
}
