import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript"
import { Peyment } from "../../peyment/models/peyment.model"
import { Appointment } from "../../appointments/models/appointment.model"

interface IPatientCreationAttr{
    full_name:string
    phone_number:string
    email:string
    password_hash:string
    address:string
    brith_day:string
    blood_group:string
    allergies:string
    bio:string
    role:string
}
@Table({tableName:"patients"})
export class Patient  extends Model<Patient, IPatientCreationAttr>{
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
    declare full_name:string
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    declare phone_number:string
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true,
        validate:{
        isEmail: true
        }
    })
    declare email:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare password_hash:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare address:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare brith_day:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare blood_group:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare allergies:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare bio:string

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    declare is_active:boolean

  @Column({
    type: DataType.STRING(100),
    defaultValue: DataType.UUIDV4(),
  })
  declare activation_link: string;
  @Column({
    type: DataType.STRING(100),
  })
  declare hashed_refresh_token: string;
  @Column({
    type: DataType.STRING,
    defaultValue:"patient"
  })
  declare role:string

    @HasMany(()=>Peyment)
    peyment:Peyment
    @HasMany(()=>Appointment)
    appointment:Appointment

}
