import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

export enum UserType {
  PROVIDER = 'provider',
  CLIENT = 'client',
}

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.ENUM(...Object.values(UserType)),
    allowNull: false,
    defaultValue: UserType.CLIENT,
  })
  type!: string;
}
