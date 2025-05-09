import { isEmail } from "class-validator"
import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsEmail, Model, Table } from "sequelize-typescript"
import { Schedule } from "../../schedules/models/schedule.model"
import { Department } from "../../departments/models/department.model"
import { Appointment } from "../../appointments/models/appointment.model"
import { App } from 'supertest/types';

interface IDoctorCreationattr{
    full_name:string
    phone_number:string
    email:string
    password_hash:string
    specialization:string
    experience:string
    education:string
    bio:string
    img:string
    address:string
    departmentId:number
}
@Table({tableName:"doctors"})
export class Doctor extends Model<Doctor, IDoctorCreationattr>{
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
        // unique:true,
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
    declare specialization:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare experience:string
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    declare education:string
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
        type:DataType.STRING,
        allowNull:true
    })
    declare img:string
    @Column({
        type:DataType.STRING,
        allowNull:true
    })
    declare address:string
    //======
    @ForeignKey(()=>Department)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare departmentId:number
    @BelongsTo(()=>Department)
    department:Department

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
    defaultValue:"doctor"
  })
  declare role:string
    //=======
    @HasMany(()=>Schedule)
    schedules:Schedule[]
    @HasMany(()=>Appointment)
    appointment:Appointment[]
}
