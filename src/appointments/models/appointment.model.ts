import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Doctor } from '../../doctors/models/doctor.entity';
import { Patient } from '../../patients/models/patient.model';


interface IAppointmentCreationAttr {
  doctorId: number;
  patientId: number;
  status: string;
  purpose: string; 
}

@Table({ tableName: 'appointments' })
export class Appointment extends Model<Appointment, IAppointmentCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare doctorId: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ForeignKey(() => Patient)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare patientId: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare purpose: string;
}
