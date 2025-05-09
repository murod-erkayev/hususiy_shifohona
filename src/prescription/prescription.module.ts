import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController } from './prescription.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Prescription } from './model/prescription.model';
import { Medication } from '../medications/models/medication.model';
import { MedicationsModule } from '../medications/medications.module';

@Module({
  imports:[SequelizeModule.forFeature([Prescription]), MedicationsModule],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports:[PrescriptionService]
})
export class PrescriptionModule {}
