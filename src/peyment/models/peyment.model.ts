import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Patient } from '../../patients/models/patient.model';

interface IPeymentCreationAttr{
    pateintId:number
    amount:number
    type:string
    status:string
    description:string
}
@Table({tableName:"payment"})
export class Peyment  extends Model<Peyment, IPeymentCreationAttr>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @ForeignKey(()=>Patient)
    @Column({
        type:DataType.INTEGER
    })
    declare pateintId:number
    @BelongsTo(()=>Patient)
    patient:Patient

    @Column({
        type:DataType.DECIMAL
    })
    declare amount:number

    @Column({
        type:DataType.STRING
    })
    declare type:string
    @Column({
        type:DataType.STRING
    })
    declare status:string

    @Column({
        type:DataType.STRING
    })
    declare description:string
}
