import {Sequelize, SequelizeOptions} from 'sequelize-typescript';
import accessEnv from '../helpers/accessEnv';
import {BookModel} from '../models/book';

const options: SequelizeOptions = {
  host: accessEnv('HOST'),
  port: accessEnv('PORT'),
  username: accessEnv('USERNAME'),
  password: accessEnv('PASSWORD'),
  database: accessEnv('DATABASE'),
  dialect: accessEnv('DIALECT'),
};

const sequelize = new Sequelize(options);
sequelize.addModels([BookModel]);

export default sequelize;
