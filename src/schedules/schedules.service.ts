import { Injectable } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Schedule } from './models/schedule.model';
import { Doctor } from '../doctors/models/doctor.entity';
import { DoctorsService } from '../doctors/doctors.service';

@Injectable()
export class SchedulesService {
  constructor(@InjectModel(Schedule) private readonly scheduleModel: typeof Schedule, 
  private readonly doctorsService:DoctorsService) {}
  create(createScheduleDto: CreateScheduleDto) {
    const {doctorId} = createScheduleDto
    const checkDoctor = this.doctorsService.findOne(doctorId)
    if(!checkDoctor) {
      throw new Error('Doctor not found')
    }
    return this.scheduleModel.create(createScheduleDto);
  }
  findAll() {
    return this.scheduleModel.findAll({
      include:{all:true},
    });
  }
  findOne(id: number) {
    return this.scheduleModel.findOne({
      where: { id },
      include: { all: true },
    });
  }
  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    const { doctorId} = updateScheduleDto;
    const checkDoctor = this.doctorsService.findOne(doctorId!);
    if (!checkDoctor) {
      throw new Error('Doctor not found');
    }
    return this.scheduleModel.update(updateScheduleDto, { where: { id } });
  }
  remove(id: number) {
    return this.scheduleModel.destroy({ where: { id } });
  }
}
