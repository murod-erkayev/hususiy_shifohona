import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Appointment } from '../../appointments/models/appointment.model';
import { Prescription } from '../../prescription/model/prescription.model';

interface IMedicalRecoredsCreationAtte {
  observation: string;
  diagnosis: string;
  appointmentId: number;
  prescriptionId: number;
}

@Table({ tableName: 'medical_records' })
export class MedicalRecord extends Model<MedicalRecord, IMedicalRecoredsCreationAtte> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare observation: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare diagnosis: string;

  @ForeignKey(() => Appointment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare appointmentId: number;

  @BelongsTo(() => Appointment)
  appointment: Appointment;

  @ForeignKey(() => Prescription)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare prescriptionId: number;

  @BelongsTo(() => Prescription)
  prescription: Prescription;
}
