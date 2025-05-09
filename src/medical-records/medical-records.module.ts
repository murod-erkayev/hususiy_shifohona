import { Module } from '@nestjs/common';
import { MedicalRecordsService } from './medical-records.service';
import { MedicalRecordsController } from './medical-records.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MedicalRecord } from './models/medical-record.model';
import { AppointmentsModule } from '../appointments/appointments.module';
import { PrescriptionModule } from '../prescription/prescription.module';

@Module({
  imports:[SequelizeModule.forFeature([MedicalRecord]),AppointmentsModule,PrescriptionModule],
  controllers: [MedicalRecordsController],
  providers: [MedicalRecordsService],
})
export class MedicalRecordsModule {}
