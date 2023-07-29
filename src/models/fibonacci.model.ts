import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export interface FibonacciAttributes {
  id?: number;
  inputNumber: number;
  fibSequence: string;
}

class Fibonacci extends Model<FibonacciAttributes> {
  public id?: number;
  public inputNumber!: number;
  public fibSequence!: string;
}

Fibonacci.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    inputNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fibSequence: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: 'fibonacci',
    sequelize
  }
);


export default Fibonacci;


