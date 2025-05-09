import { MailService } from './../mail/mail.service';
import { DepartmentsService } from './../departments/departments.service';
import { BadGatewayException, BadRequestException, flatten, Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.entity';
import * as bacrypt from 'bcrypt';
import { AdminModule } from '../admin/admin.module';
@Injectable()
export class DoctorsService {
  constructor(@InjectModel(Doctor) private readonly doctorModel:typeof Doctor,
      private readonly departmentsService:DepartmentsService,
    private readonly mailService:MailService){}
  async create(createDoctorDto: CreateDoctorDto) {

    const {confirm_password, password_hash, email, departmentId} = createDoctorDto
    const checkDepartment = await this.departmentsService.findOne(departmentId)
    if(!checkDepartment) {
      throw new Error('Department not found')
    }
    const checkUniqueEmail = await this.doctorModel.findOne({where:{email}})
    if(checkUniqueEmail) {
      throw new Error('Email Yoki Telefon reqami alaqchon mavjud')
    }
    if(confirm_password !== password_hash) {
      throw new Error('Password and confirm password do not match')
    }
    const hashed_password = await bacrypt.hash(password_hash, 7)
    const newDoctor =await this.doctorModel.create({
      ...createDoctorDto,
      password_hash:hashed_password
    })
    try {
      this.mailService.sendMailDocotr(newDoctor)
    } catch (error) {
      console.log("Emailga Hat Yuborishda Hatolik Yuzaga Keldi");
    }
    return newDoctor
  }
  findAll() {
    return this.doctorModel.findAll({
      include:{all:true},
    })
  }
  findOne(id: number) {
    return this.doctorModel.findOne({
      where: { id },
      include: { all: true },
    })
  }
  
  updateAdmin(id: number, hashed_refresh_token:string) {
    return this.doctorModel.update({hashed_refresh_token}, {where:{id}})
  }
  
  findDoctorByEmail(email: string) {
    return this.doctorModel.findOne({
      where: { email }
    })
  }
  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    
    const {confirm_password, password_hash, departmentId} = updateDoctorDto
    const checkDepartment = await this.departmentsService.findOne(departmentId!)
    if(!checkDepartment) {
      throw new Error('Department not found')
    }
    if(confirm_password !== password_hash) {
      throw new Error('Password and confirm password do not match')
    }
    const hashed_password = bacrypt.hash(password_hash!, 7)
    updateDoctorDto.password_hash = await hashed_password
    // const checkUniqueEmail = await this.doctorModel.findOne({where:{email:email}})
    // if(checkUniqueEmail) {
    //   throw new Error('Email Yoki Telefon reqami alaqchon mavjud')
    // }
    const newDoctor = await this.doctorModel.update(updateDoctorDto,{where:{id}})
    return {message:"Doctor updated", newDoctor}  
  }
  remove(id: number) {
    return this.doctorModel.destroy({where:{id}})
  }


  async activateDoctor(link:string){
    if(!link){
      throw new  BadRequestException({messsage:"Activation link not found"})
    }
    const updateDoctor = await this.doctorModel.update({
      is_active:true
    }, {
      where:
      {
        activation_link:link, is_active:false
      },returning:true})
    if(!updateDoctor[1][0]){
      throw new BadRequestException({message:"User already activated"})
    }
    return {
      massage:"User Activete Successfully",
      is_activate:updateDoctor[1][0].is_active
    }
  }
  async updateStatusApointment(status:string){
    
  }
}
