import { Module } from '@nestjs/common';
import { PeymentService } from './peyment.service';
import { PeymentController } from './peyment.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { Peyment } from './models/peyment.model';
import { Patient } from '../patients/models/patient.model';
import { PatientsModule } from '../patients/patients.module';

@Module({
  imports:[SequelizeModule.forFeature([Peyment]), PatientsModule],
  controllers: [PeymentController],
  providers: [PeymentService],
  exports:[PeymentService]
})
export class PeymentModule {}
