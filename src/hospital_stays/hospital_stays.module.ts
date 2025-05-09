import { Module } from '@nestjs/common';
import { HospitalStaysService } from './hospital_stays.service';
import { HospitalStaysController } from './hospital_stays.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalStay } from './models/hospital_stay.model';

@Module({
  imports:[SequelizeModule.forFeature([HospitalStay])],
  controllers: [HospitalStaysController],
  providers: [HospitalStaysService],
})
export class HospitalStaysModule {}
