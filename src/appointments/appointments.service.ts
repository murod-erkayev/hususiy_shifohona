import { MailerService } from '@nestjs-modules/mailer';
import { PatientsService } from './../patients/patients.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Appointment } from './models/appointment.model';
import { DoctorsService } from '../doctors/doctors.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AppointmentsService {
  constructor(@InjectModel(Appointment) private readonly appointment:typeof Appointment,
private readonly doctorSrevice:DoctorsService,
private readonly patientsService:PatientsService,
private readonly mailerService:MailService) {
    
  }
  async create(createAppointmentDto: CreateAppointmentDto) {
    const {doctorId ,patientId, confirmation_link} = createAppointmentDto
    const doctor = await this.doctorSrevice.findOne(doctorId)
    if(!doctor){
      throw new NotFoundException({message:"Bunday Doctor id mavjud emas"})
    }
    const patient = await this.patientsService.findOne(patientId)
    if(!patient){
      throw new BadRequestException({message:"Bunday  patient id mavjud emas"})
    }

    const newAppointment = await  this.appointment.create({
      ...createAppointmentDto,
      status:false,
      confirmation_link:confirmation_link
    })
    try {
      await this.mailerService.sendMailDoctorAppointment(doctor, newAppointment, patient)
    } catch (error) {
      console.error('E-pochta jo‘natishda xatolik:', error);
    }
  }

async confirmAppointment(confirmationLink: string) {
    const appointment = await this.appointment.findOne({
      where: { confirmation_link: confirmationLink },
    });

    if (!appointment) {
      throw new NotFoundException('Noto‘g‘ri tasdiqlash havolasi');
    }

    if (appointment.status) {
      throw new BadRequestException('Uchrashuv allaqachon tasdiqlangan');
    }

    appointment.status = true;
    await appointment.save();

    return { message: 'Uchrashuv muvaffaqiyatli tasdiqlandi' };
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
