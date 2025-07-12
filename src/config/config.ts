import dotenv from 'dotenv';
import * as process from 'node:process';

dotenv.config();

export const Config = {
  node_env: String(process.env.NODE_ENV),
  port: Number(process.env.PORT),
  jwt: {
    iss: String(process.env.JWT_ISS),
    secret: String(process.env.JWT_SECRET),
    tll: {
      accessToken: Number(process.env.JWT_ACCESS_TOKEN_TTL),
      refreshToken: Number(process.env.JWT_REFRESH_TOKEN_TTL),
    },
  },
  postgres: {
    host: String(process.env.POSTGRES_HOST),
    port: Number(process.env.POSTGRES_PORT),
    db: String(process.env.POSTGRES_DB),
    username: String(process.env.POSTGRES_APP_USER),
    password: String(process.env.POSTGRES_APP_PASSWORD),
  },
  redis: {
    host: String(process.env.REDIS_HOST),
    port: Number(process.env.REDIS_PORT),
    username: String(process.env.REDIS_USER),
    password: String(process.env.REDIS_USER_PASSWORD),
  },
};
