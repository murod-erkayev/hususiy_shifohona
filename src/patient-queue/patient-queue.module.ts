import { Module } from '@nestjs/common';
import { PatientQueueService } from './patient-queue.service';
import { PatientQueueController } from './patient-queue.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PatientQueue } from './models/patient-queue.model';
import { DepartmentsModule } from '../departments/departments.module';

@Module({
  imports:[SequelizeModule.forFeature([PatientQueue]), DepartmentsModule],
  controllers: [PatientQueueController],
  providers: [PatientQueueService],
  exports:[PatientQueueService]
})
export class PatientQueueModule {}
