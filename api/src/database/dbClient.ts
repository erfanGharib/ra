import { Sequelize } from 'sequelize';
import { env } from 'process';
import { sqliteDbPath } from '../global/index.js';

export const dbClient = new Sequelize(
  env.DB_NAME,
  env.DB_USER, 
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    dialect: 'sqlite',
	storage: sqliteDbPath		
  }
);
