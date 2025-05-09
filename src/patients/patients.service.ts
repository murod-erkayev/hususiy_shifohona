import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Patient } from './models/patient.model';
import * as bacrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class PatientsService {
  constructor(@InjectModel(Patient) private readonly patientModel: typeof Patient, 
private readonly mailService:MailService) {} 
  async create(createPatientDto: CreatePatientDto) {
    const {confirm_password, password_hash, email} = createPatientDto
    const checkUniqueEmail = await this.patientModel.findOne({where:{email}})
    if(checkUniqueEmail) {
      throw new Error('Email Yoki Telefon reqami alaqchon mavjud')
    }
    if(confirm_password !== password_hash) {
      throw new Error('Password and confirm password do not match')
    }
    const hashed_password = await bacrypt.hash(password_hash, 7)
    const newPatient =await this.patientModel.create({
      ...createPatientDto,
      password_hash:hashed_password
    })
    try {
      await this.mailService.sendMailPatient(newPatient)
    } catch (error) {
      console.log("Emailga Hat Yuborishda hatolik Yuzag keldi ");
    }
    return newPatient
  }

  findAll() {
    return this.patientModel.findAll()
  }

  findOne(id: number) {
    return this.patientModel.findByPk(id)
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const {confirm_password, password_hash, email} = updatePatientDto
    if(confirm_password !== password_hash) {
      throw new Error('Password and confirm password do not match')
    }
    const hashed_password = bacrypt.hash(password_hash!, 7)
    updatePatientDto.password_hash = await hashed_password
    delete updatePatientDto.confirm_password
    const checkUniqueEmail = await this.patientModel.findOne({where:{email:email}})
    if(checkUniqueEmail) {
      throw new Error('Email Yoki Telefon reqami alaqchon mavjud')
    }
    const newDoctor = await this.patientModel.update(updatePatientDto,{where:{id}})
    return {message:"Patient updated", newDoctor}  
  }

  remove(id: number) {
    return this.patientModel.destroy({where:{id}})
  }

  async findPatientByEmail(email: string) {
    const patinet = await this.patientModel.findOne({where:{email}})
    console.log(patinet?.email);
    return patinet

  }
  async updatePatient(id:number, hashed_refresh_token:string){
    const patient = await this.patientModel.update({hashed_refresh_token}, {where:{id}})
    return patient
  }
  async activatePatien(link:string){
    if(!link){
      throw new BadRequestException({message:"Link Hato"})
    }
    const patient = await this.patientModel.update({is_active:true}, {where:{is_active:false, activation_link:link}, returning:true})
    if(!patient[1][0]){
      throw new BadRequestException({message:"Patient Not Found"})
    }
    return {
      message:"Patient Activete Seccussfully",
      is_activete:patient[1][0].is_active
    }
  }
}
