import { Doctor } from './../../doctors/models/doctor.entity';
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";

interface IDepartmentCreationAttr{
    name:string
}
@Table({tableName:"departments"})
export class Department extends Model<Department, IDepartmentCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    declare name:string
    @HasMany(()=>Doctor)
    doctor:Doctor
}
