import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Schedule } from './models/schedule.model';
import { Doctor } from '../doctors/models/doctor.entity';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [SequelizeModule.forFeature([Schedule]),DoctorsModule],
  controllers: [SchedulesController],
  providers: [SchedulesService],
  exports: [SchedulesService],
})
export class SchedulesModule {}
