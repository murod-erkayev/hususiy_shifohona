import { DepartmentsService } from './../departments/departments.service';
import { Patient } from './../patients/models/patient.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientQueueDto } from './dto/create-patient-queue.dto';
import { UpdatePatientQueueDto } from './dto/update-patient-queue.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PatientQueue } from './models/patient-queue.model';
import { where } from 'sequelize';

@Injectable()
export class PatientQueueService {
  constructor(@InjectModel(PatientQueue) private readonly patientQueue:typeof PatientQueue,
private readonly departmentsService:DepartmentsService) {}
  async create(createPatientQueueDto: CreatePatientQueueDto) {
    const {departmentId} = createPatientQueueDto
    const department = await this.departmentsService.findOne(departmentId)
    if(!department){
      throw new BadRequestException({message:"Bunday department Id toplimadi"})
    }
    return this.patientQueue.create(createPatientQueueDto)
  }

  findAll() {
    return this.patientQueue.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.patientQueue.findOne({include:{all:true},where:{id}})
  }

 async update(id: number, updatePatientQueueDto: UpdatePatientQueueDto) {
    const {departmentId} = updatePatientQueueDto
    const department = await this.departmentsService.findOne(departmentId!)
    if(!department){
      throw new BadRequestException({message:"Bunday department Id toplimadi"})
    }
  }
  remove(id: number) {
    return this.patientQueue.destroy({where:{id}})
  }
}
