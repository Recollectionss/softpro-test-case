import app from './app';
import { Config } from './config/config';
import { postgresTestConnection } from './modules/postgres/postgres.test.connection';
import { initRedis } from './modules/redis/redis.provider';

async function bootstrap() {
  await postgresTestConnection();
  await initRedis();
  app.listen(Config.port, () => {
    console.log(`Server running on port ${Config.port}`);
  });
}
console.log(new Date().getMinutes());
bootstrap();
