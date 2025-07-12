import { createClient } from 'redis';
import { Config } from '../../config/config';

const redisClient = createClient({
  socket: {
    host: Config.redis.host,
    port: Config.redis.port,
  },
});

export const initRedis = async () => {
  redisClient.on('error', (err) => console.error('Redis error:', err));
  redisClient.on('connect', () => console.log('✓ Redis connected'));

  await redisClient.connect();
};

export const getRedisClient = () => redisClient;
