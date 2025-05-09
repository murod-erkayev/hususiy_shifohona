import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript';
import { Medication } from '../../medications/models/medication.model';

interface IPrescriptionCreationAttr {
  medicationId: number;
  instructions: string;
  description: string;
}

@Table({ tableName: 'prescriptions' })
export class Prescription extends Model<Prescription, IPrescriptionCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.INTEGER,
    allowNull: false
  })
  declare medicationId: number;
  @BelongsTo(() => Medication)
  medication: Medication;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare instructions: string;

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare description: string;
}
