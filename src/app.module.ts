import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { DoctorsModule } from './doctors/doctors.module';
import { PatientsModule } from './patients/patients.module';
import { MedicationsModule } from './medications/medications.module';
import { DepartmentsModule } from './departments/departments.module';
import { SchedulesModule } from './schedules/schedules.module';
import { ReviewsModule } from './reviews/reviews.module';
import { AdminModule } from './admin/admin.module';
import { PeymentModule } from './peyment/peyment.module';
import { HospitalStaysModule } from './hospital_stays/hospital_stays.module';
import { PrescriptionModule } from './prescription/prescription.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicalRecordsModule } from './medical-records/medical-records.module';
import { PatientQueueModule } from './patient-queue/patient-queue.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env",isGlobal: true }),
    //   TelegrafModule.forRootAsync({
    //   botName: BOT_NAME,
    //   useFactory: () => ({
    //     token: process.env.BOT_TOKEN!,
    //     middlewares: [],
    //     include: [BotModule],
    //   }),
    // }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.PG_HOST,
      port: Number(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      models: [],
      autoLoadModels: true,
      sync: { alter: true },
      logging: false,
    }),
    DoctorsModule,
    PatientsModule,
    MedicationsModule,
    DepartmentsModule,
    SchedulesModule,
    ReviewsModule,
    AdminModule,
    PeymentModule,
    HospitalStaysModule,
    PrescriptionModule,
    AppointmentsModule,
    MedicalRecordsModule,
    PatientQueueModule,
    AuthModule,
  ],
})
export class AppModule {}
