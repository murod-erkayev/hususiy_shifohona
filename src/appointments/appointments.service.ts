import { PatientsService } from './../patients/patients.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private readonly appointment:typeof Appointment,
private readonly doctorSrevice:DoctorsService,
private readonly patientsService:PatientsService) {
    
  }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const {doctorId ,patientId} = createAppointmentDto
    const doctor = await this.doctorSrevice.findOne(doctorId)
    if(!doctor){
      throw new BadRequestException({message:"BUnday Doctor id mavjud emas"})
    }
    const patient = await this.patientsService.findOne(patientId)
    if(!patient){
      throw new BadRequestException({message:"Bunday  patient id mavjud emas"})
    }
    return this.appointment.create(createAppointmentDto)
  }


  findAll() {
    return this.appointment.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.appointment.findOne({where:{id}, include:{all:true}})
  }

  async  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const {doctorId ,patientId} = updateAppointmentDto
    const doctor = await this.doctorSrevice.findOne(doctorId!)
    if(!doctor){
      throw new BadRequestException({message:"BUnday Doctor id mavjud emas"})
    }
    const patient = await this.patientsService.findOne(patientId!)
    if(!patient){
      throw new BadRequestException({message:"Bunday  patient id mavjud emas"})
    }
    return this.appointment.update(updateAppointmentDto, {where:{id}})
  }

  remove(id: number) {
    return this.appointment.destroy({where:{id}})
  }
}
