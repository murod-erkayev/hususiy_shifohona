import { Data } from './../../../node_modules/@types/ejs/index.d';
import { Column, DataType, Model, Table } from "sequelize-typescript"

interface IadminCreationattr{
    full_name:string
    phone_number:string
    email:string
    password_hash:string
    role:string
}
@Table({tableName:"admin"})
export class Admin extends Model<Admin, IadminCreationattr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    declare id:number

    @Column({
        type:DataType.STRING,
    })
    declare full_name:string


    @Column({
        type:DataType.STRING,
    })
    declare phone_number:string


    @Column({
        type:DataType.STRING,
    })
    declare email:string

    @Column({
        type:DataType.ENUM("admin", "superadmin"),
    })
    declare role:string

    @Column({
        type:DataType.STRING,
    })
    declare password_hash:string

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
}
