import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Prescription } from "../../prescription/model/prescription.model"

interface IMedicationCreationAttr{
    name:string
    type:string
    price:number
    quantity:number
    description:string
}
@Table({tableName:"medications"})
export class Medication  extends Model<Medication, IMedicationCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare name:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare type:string
    @Column({
        type:DataType.DECIMAL(8, 2),
        allowNull:false
    })
    declare price:number
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare quantity:number
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare description:string

    @HasMany(()=>Prescription)
    prescription:Prescription
}
