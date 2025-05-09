import { Patient } from './../patients/models/patient.model';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePeymentDto } from './dto/create-peyment.dto';
import { UpdatePeymentDto } from './dto/update-peyment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Peyment } from './models/peyment.model';
import { PatientsService } from '../patients/patients.service';

@Injectable()
export class PeymentService {
  constructor(@InjectModel(Peyment) private readonly peyment:typeof Peyment, 
    private readonly patient:PatientsService) { }
  create(createPeymentDto: CreatePeymentDto) {
    const {pateintId} =createPeymentDto
    const patient = this.patient.findOne(pateintId)
    if(!patient){
      throw new BadRequestException({message:"Bunday Id Mavjud Emas"})
    }
    return this.peyment.create(createPeymentDto)
  }

  findAll() {
    return this.peyment.findAll({include:{all:true}})
    }

  findOne(id: number) {
    return this.peyment.findOne({where:{id}, include:{all:true}})
  }

  update(id: number, updatePeymentDto: UpdatePeymentDto) {
    const {pateintId} =updatePeymentDto
    const patient = this.patient.findOne(pateintId!)
    if(!patient){
      throw new BadRequestException({message:"Bunday Id Mavjud Emas"})
    }
    return this.peyment.update(updatePeymentDto, {where:{id}})
  }
  remove(id: number) {
    return this.peyment.destroy({where:{id}})
  }
}
