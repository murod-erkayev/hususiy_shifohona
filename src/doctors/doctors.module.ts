import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Doctor } from './models/doctor.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[SequelizeModule.forFeature([Doctor]),DepartmentsModule, MailModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
