import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import config from '../config/config.json';

interface BaseConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: string;
}

interface SQLiteConfig extends BaseConfig {
  storage: string;
}

interface MySQLConfig extends BaseConfig {
  // MySQL specific configs, if any
}

type DBConfig = SQLiteConfig | MySQLConfig;

const env = process.env.NODE_ENV || 'development';
const dbConfig: DBConfig = config[env as keyof typeof config] as DBConfig;

const sequelizeConfig: SequelizeOptions = {
  username: dbConfig.username,
  password: dbConfig.password!,
  database: dbConfig.database,
  host: dbConfig.host,
  dialect: dbConfig.dialect as any,
  models: [__dirname + '/models'],
  ...(dbConfig.dialect === 'sqlite' && { storage: (dbConfig as SQLiteConfig).storage }),
};

const sequelize = new Sequelize(sequelizeConfig);

export default sequelize;
