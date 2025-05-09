import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctors/models/doctor.entity";
import { Patient } from "../../patients/models/patient.model";

interface IreviewCreationAttr {
    doctorId: number;
    patientId: number;
    rating: number;
    comment: string;
}
@Table({tableName:'reviews'})
export class Review extends Model<Review, IreviewCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number
    @ForeignKey(()=>Doctor)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare doctorId:number
    @BelongsTo(()=>Doctor)
    doctor:Doctor


    @ForeignKey(()=>Patient)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare patientId:number
    @BelongsTo(()=>Patient)
    patient:Patient

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare rating:number
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare comment:string

}
