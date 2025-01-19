import { NodeEnv } from '../shared/enums/node-env.enum';
import { IAppConfig } from './app.config';
import { IAuthConfig } from './auth.config';
import { databaseConfig, IDatabaseConfig } from './database.config';
import { IFirebaseConfig } from './firebase.config';
import { IGoogleConfig } from './google.config';
import { IJwtConfig, jwtConfig } from './jwt.config';
import { IMailerConfig } from './mailer.config';
import { IRedisConfig } from './redis.config';

export interface IConfig {
  env: string;
  port: number;
  host: string;
  logLevel: string;
  clustering: string;
  database: IDatabaseConfig;
  jwt: IJwtConfig;
  mailer: IMailerConfig;
  logo: string;
  app: IAppConfig;
  auth: IAuthConfig;
  redis: IRedisConfig;
  google: IGoogleConfig;
  firebase: IFirebaseConfig;
}

export const configuration = (): Partial<IConfig> => ({
  env: process.env.NODE_ENV || NodeEnv.DEVELOPMENT,
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '127.0.0.1',
  logLevel: process.env.LOG_LEVEL,
  clustering: process.env.CLUSTERING,
  database: databaseConfig(),
  jwt: jwtConfig(),
});
