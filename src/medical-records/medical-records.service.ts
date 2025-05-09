import { PrescriptionService } from './../prescription/prescription.service';
import { AppointmentsService } from './../appointments/appointments.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMedicalRecordDto } from './dto/create-medical-record.dto';
import { UpdateMedicalRecordDto } from './dto/update-medical-record.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';

@Injectable()
export class MedicalRecordsService {
  constructor(@InjectModel(MedicalRecord) private readonly medicalREcord:typeof MedicalRecord,
private readonly appointmentsService:AppointmentsService,
private readonly prescriptionService:PrescriptionService,) {
    
  }
  async create(createMedicalRecordDto: CreateMedicalRecordDto) {
    const {appointmentId, prescriptionId} = createMedicalRecordDto  
    const appointment =await this.appointmentsService.findOne(appointmentId)
    if(!appointment){
      throw new BadRequestException({message:"Bunday appointemnt Id malumotlari mavjud emas"})
    }
    const prescription =await this.prescriptionService.findOne(prescriptionId)
    if(!prescription){
      throw new BadRequestException({message:"Bunday prescription Id malumotlari mavjud emas"})
    }
    return this.medicalREcord.create(createMedicalRecordDto)
  }

  findAll() {
    return this.medicalREcord.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.medicalREcord.findOne({where:{id},include:{all:true}})
  }

  async update(id: number, updateMedicalRecordDto: UpdateMedicalRecordDto) {
    const {appointmentId, prescriptionId} = updateMedicalRecordDto  
    const appointment =await this.appointmentsService.findOne(appointmentId!)
    if(!appointment){
      throw new BadRequestException({message:"Bunday appointemnt Id malumotlari mavjud emas"})
    }
      const prescription =await this.prescriptionService.findOne(prescriptionId!)
    if(!prescription){
      throw new BadRequestException({message:"Bunday prescription Id malumotlari mavjud emas"})
    }
    return this.medicalREcord.update(updateMedicalRecordDto, {where:{id}})
  }

  remove(id: number) {
    return this.medicalREcord.destroy({where:{id}})
  }
}
