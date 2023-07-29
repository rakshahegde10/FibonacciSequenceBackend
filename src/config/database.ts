import { Sequelize } from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

var dialect : any = process.env.DB_DIALECT

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: dialect,
});

(async () => {
  try {
    await sequelize.authenticate(); //authenticate database with credentials
    console.log('Postgres Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize;