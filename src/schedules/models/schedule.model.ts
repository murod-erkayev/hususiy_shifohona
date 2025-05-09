import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.entity";
interface IschuduleCreationAttr{
    doctorId:number;
    start_time:string;
    end_time:string;
    week_day:string;
}
@Table({tableName:'schedules'})
export class Schedule  extends Model<Schedule, IschuduleCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id:number
    @ForeignKey(()=>Doctor)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare doctorId:number
    @BelongsTo(()=>Doctor)
    doctor:Doctor
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare start_time:string
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare end_time:string
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare week_day:string
}
