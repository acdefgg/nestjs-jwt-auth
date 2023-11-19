import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({allowNull: false, unique: true})
  email: string;

  @Column({allowNull: false})
  passwordHash: string;

  @Column({allowNull: false})
  userInfo: string;

  @Column({allowNull: false})
  refreshTokenVersion: string;
}
