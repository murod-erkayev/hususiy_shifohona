import { MailService } from './../mail/mail.service';
import { BadRequestException, ServiceUnavailableException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './models/admin.model';
import * as bacrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel:typeof Admin,
  private readonly  mailService:MailService) {}

  async create(createAdminDto: CreateAdminDto) {
    const {confirm_password, password_hash} = createAdminDto
    if(confirm_password !== password_hash){
      throw new BadRequestException({message:"Confirm_password va password_hash togri kelmadi"})
    }
    const hashed_password = await bacrypt.hash(password_hash, 7)
    const admin =  await this.adminModel.create({...createAdminDto, password_hash:hashed_password})
    try {
      await this.mailService.sendMailAdmin(admin)
    } catch (error) {
      console.log(error);
      throw new ServiceUnavailableException("Emailga xat yuborishda xatolik")
    }
    return admin
  }
  findAll() {
    return this.adminModel.findAll()
  }

  findOne(id: number) {
    return this.adminModel.findByPk(id)
  }

  async findAdminByEmail(email: string) {
    const admin = await this.adminModel.findOne({where:{email}})
    console.log(admin?.email);
    return admin

  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const admins = await this.adminModel.findByPk(id)
    if(!admins){
      throw new BadRequestException({message:"Bunday Id mavjud emas"})
    }
    const {password_hash, confirm_password} = updateAdminDto
    if(confirm_password !== password_hash){
      throw new BadRequestException({message:"Confirm_password va password_hash togri kelmadi"})
    }
    updateAdminDto.password_hash = await bacrypt.hash(password_hash!, 7)
    return this.adminModel.update(updateAdminDto, {where:{id}})
  }
  remove(id: number) {
    return this.adminModel.destroy({where:{id}})
  }
  async activateAdmin(link:string){
    if(!link){
      throw new BadRequestException("Activation link not found")

    }
    const updateAdmin = await this.adminModel.update(
      {
        is_active:true
      },
      {where:{
        activation_link:link,
        is_active:false
      },
      returning:true
    }
    )
    if(!updateAdmin[1][0]){
      throw new BadRequestException("User already activated")
    }

    return {
      message:"User Activete Successfully",
      is_active:updateAdmin[1][0].is_active
    }
  }

  async updateAdmin(id:number, hashed_refresh_token:string){
    const admin = await this.adminModel.update({hashed_refresh_token}, {where:{id}})
    return admin
  }

}
