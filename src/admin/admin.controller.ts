import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Roles } from '../common/decorators/role.decorator';
import { JwtAuthGuard } from '../common/guards/user.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { JwtSelfGuard } from '../common/guards/self.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin")
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles("superadmin")
  @Get()
  findAll() {
    return this.adminService.findAll();
  }
// Activation 
  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.adminService.activateAdmin(link);
  }
  @UseGuards(JwtAuthGuard,RolesGuard,JwtSelfGuard)
  @Roles("superadmin", "admin")
  @Get(':id') 
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("superadmin")
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
