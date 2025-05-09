import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Department } from "../../departments/models/department.model";

interface IPatientQueueCreationAttr {
  departmentId: number;
  queue_number: number;
  status: number;
}

@Table({ tableName: "patient_queue" })
export class PatientQueue extends Model<PatientQueue, IPatientQueueCreationAttr> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;  // Id fieldi avtomatik raqamlanadi

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
  })
  declare departmentId: number;  // Foreign key, Department bilan bog'lanadi

  @BelongsTo(() => Department)
  department: Department;  // Department modeli bilan bog'lanish

  @Column({
    type: DataType.INTEGER,
  })
  declare queue_number: number;  // Navbat raqami

  @Column({
    type: DataType.INTEGER,
  })
  declare status: number;  // Statusi (masalan, 1 - ishlashda, 0 - tugagan)
}
