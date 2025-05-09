import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PeymentService } from './peyment.service';
import { CreatePeymentDto } from './dto/create-peyment.dto';
import { UpdatePeymentDto } from './dto/update-peyment.dto';

@Controller('peyment')
export class PeymentController {
  constructor(private readonly peymentService: PeymentService) {}

  @Post()
  create(@Body() createPeymentDto: CreatePeymentDto) {
    return this.peymentService.create(createPeymentDto);
  }

  @Get()
  findAll() {
    return this.peymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.peymentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePeymentDto: UpdatePeymentDto) {
    return this.peymentService.update(+id, updatePeymentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.peymentService.remove(+id);
  }
}
