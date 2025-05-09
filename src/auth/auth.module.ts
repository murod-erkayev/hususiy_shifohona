import { Module } from '@nestjs/common';
import { AuthService } from './admin/auth.service';
import { AuthController } from './admin/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from '../admin/admin.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { AuthDoctorController } from './doctor/auth.doctor.controller';
import { AuthDoctrService } from './doctor/auth.doctor.service';
import { PatientsModule } from '../patients/patients.module';
import { AuthPatientController } from './patient/auth.patient.controller';
import { AuthPatientService } from './patient/auth.patient.service';

@Module({
  imports:[JwtModule.register({global:true}),AdminModule, DoctorsModule, PatientsModule],
  controllers: [AuthController, AuthDoctorController, AuthPatientController],
  providers: [AuthService, AuthDoctrService, AuthPatientService],
})
export class AuthModule {}
