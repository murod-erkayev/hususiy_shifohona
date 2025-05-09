import { Medication } from './../medications/models/medication.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Prescription } from './model/prescription.model';
import { MedicationsService } from '../medications/medications.service';

@Injectable()
export class PrescriptionService {
  constructor(@InjectModel(Prescription) private readonly prescription:typeof Prescription, 
    private readonly medication:MedicationsService) {
    
  }
  create(createPrescriptionDto: CreatePrescriptionDto) {
    const {medicationId} =createPrescriptionDto
    const medication = this.medication.findOne(medicationId)
    if(!medication){
      throw new BadRequestException({message:"Bunday mdeciation Id Mavjud Emas"})
    }
    return this.prescription.create(createPrescriptionDto)
  }

  findAll() {
    return this.prescription.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.prescription.findOne({where:{id}, include:{all:true}})
  }

  update(id: number, updatePrescriptionDto: UpdatePrescriptionDto) {
    const {medicationId} =updatePrescriptionDto
    const medication = this.medication.findOne(medicationId!)
    if(!medication){
      throw new BadRequestException({message:"Bunday mdeciation Id Mavjud Emas"})
    }
    return this.prescription.update(updatePrescriptionDto, {where:{id}})
  }

  remove(id: number) {
    return this.prescription.destroy({where:{id}})
  }
}
