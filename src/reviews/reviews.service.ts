import { PatientsService } from './../patients/patients.service';
import { Patient } from './../patients/models/patient.model';
import { DoctorsService } from './../doctors/doctors.service';
import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './models/review.model';

@Injectable()
export class ReviewsService {
  constructor(@InjectModel(Review) private readonly review:typeof Review,
private readonly doctorsService:DoctorsService,
private readonly patientsService:PatientsService){}
  create(createReviewDto: CreateReviewDto) {
    const {doctorId,patientId} = createReviewDto
    const checkDoctor = this.doctorsService.findOne(doctorId)
    if(!checkDoctor) {
      throw new Error('Doctor not found')
    }
    const checkPatient = this.patientsService.findOne(patientId)
    if(!checkPatient) {
      throw new Error('Patient not found')
    }
    return this.review.create(createReviewDto);
  }

  findAll() {
    return this.review.findAll({
      include:{all:true},
    });
  }

  findOne(id: number) {
    return this.review.findOne({
      where: { id },
      include: { all: true },
    });
    }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    const {doctorId,patientId} = updateReviewDto
    const checkDoctor = this.doctorsService.findOne(doctorId!)
    if(!checkDoctor) {
      throw new Error('Doctor not found')
    }
    const checkPatient = this.patientsService.findOne(patientId!)
    if(!checkPatient) {
      throw new Error('Patient not found')
    }
    return this.review.update(updateReviewDto, { where: { id } });
  }
  
  remove(id: number) {
    return this.review.destroy({ where: { id } });
  }
}
