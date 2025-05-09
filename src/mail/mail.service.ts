import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Admin } from '../admin/models/admin.model';
import { Doctor } from '../doctors/models/doctor.entity';
import { Patient } from '../patients/models/patient.model';

@Injectable()
export class MailService {
    constructor(private readonly mailerSerivce: MailerService) {}

    async sendMailAdmin(admin:Admin){
        const url = `${process.env.API_HOST}/api/admin/activate/${admin.activation_link}`;
        console.log(url);

        await this.mailerSerivce.sendMail({
            to: admin.email,
            subject: 'Welcome to Hususiy Shifohona app',
            template: './confirmation', 
            context: { 
                name: admin.full_name,
                url,
             }, 
        });
    }
    async sendMailDocotr(doctor:Doctor){
        const url = `${process.env.API_HOST}/api/doctors/activate/${doctor.activation_link}`;
        console.log(url);
        await this.mailerSerivce.sendMail({
            to: doctor.email,
            subject: 'Welcome to Hususiy Shifohona app',
            template: './confirmation', 
            context: { 
                name: doctor.full_name, 
                url, 
             }, 
        });
    }
    async sendMailPatient(patient:Patient){
        const url = `${process.env.API_HOST}/api/patients/activate/${patient.activation_link}`;
        console.log(url);

        await this.mailerSerivce.sendMail({
            to: patient.email,
            subject: 'Welcome to Hususiy Shifohona app',
            template: './confirmation', 
            context: { 
                name: patient.full_name, 
                url, 
             }, 
        });
    }
}
