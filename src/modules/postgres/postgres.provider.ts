import { Config } from '../../config/config';
import { Sequelize } from 'sequelize-typescript';

export default async () => {
  const sequelize = new Sequelize({
    logging: console.log,
    dialect: 'postgres',
    host: Config.postgres.host,
    port: Config.postgres.port,
    database: Config.postgres.db,
    username: Config.postgres.username,
    password: Config.postgres.password,
  });

  if (Config.node_env === 'testing') {
    await sequelize.sync({ force: true });
  }
  return sequelize;
};
