export interface IRedisConfig {
  redisHost: string;
  redisPort: number;
  redisUsername: string;
  redisPassword: string;
  isTlsEnabled: boolean;
}

export const redisConfig = (): IRedisConfig => ({
  redisHost: process.env.REDIS_HOST,
  redisPort: Number(process.env.REDIS_PORT),
  redisUsername: process.env.REDIS_USERNAME,
  redisPassword: process.env.REDIS_PASSWORD,
  isTlsEnabled: process.env.REDIS_TLS_ENABLED === 'true',
});
