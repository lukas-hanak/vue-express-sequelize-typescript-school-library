import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({
  tableName: 'Books'
})
export class BookModel extends Model<BookModel> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER.UNSIGNED
  })
  id!: number;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  authorSurname!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  authorName!: string;
  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  title!: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER.UNSIGNED
  })
  yearOfPublish!: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER.UNSIGNED
  })
  price!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  publisher!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  typeOfPublish!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  type!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  buyDate!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  createdAt!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  updatedAt!: string;
}
