import { Injectable } from '@nestjs/common';
import { CreateHospitalStayDto } from './dto/create-hospital_stay.dto';
import { UpdateHospitalStayDto } from './dto/update-hospital_stay.dto';
import { InjectModel } from '@nestjs/sequelize';
import { HospitalStay } from './models/hospital_stay.model';

@Injectable()
export class HospitalStaysService {
  constructor(@InjectModel(HospitalStay) private readonly hospitalStay:typeof HospitalStay) {}
  create(createHospitalStayDto: CreateHospitalStayDto) {
    return this.hospitalStay.create(createHospitalStayDto)
  }

  findAll() {
    return this.hospitalStay.findAll({include:{all:true}})
  }

  findOne(id: number) {
    return this.hospitalStay.findOne({where:{id},include:{all:true}})
  }

  update(id: number, updateHospitalStayDto: UpdateHospitalStayDto) {
    return this.hospitalStay.update(updateHospitalStayDto, {where:{id}})
  }
  remove(id: number) {
    return this.hospitalStay.destroy({where:{id}})
  }
}
