import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

interface IHospitalstaysCCreationAttr {
  start_date: string;
  end_date: string;
  daily_quantity: number;
  medical_recordId: number;
}

@Table({ tableName: "hospital_stays" })
export class HospitalStay extends Model<HospitalStay, IHospitalstaysCCreationAttr> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true
  })
  declare id: number;

  @Column({
    type: DataType.STRING
  })
  declare start_date: string;

  @Column({
    type: DataType.STRING
  })
  declare end_date: string;

  @Column({
    type: DataType.INTEGER
  })
  declare daily_quantity: number;

//   @ForeignKey(() => MedicalRecord)
  @Column({
    type: DataType.INTEGER
  })
  declare medical_recordId: number;

//   @BelongsTo(() => MedicalRecord)
//   medical_record: MedicalRecord;
}
