module.exports = {
  username: String(process.env.POSTGRES_USER),
  password: String(process.env.POSTGRES_PASSWORD),
  database: String(process.env.POSTGRES_DB),
  host: String(process.env.POSTGRES_HOST),
  port: Number(process.env.POSTGRES_PORT),
  dialect: 'postgres',
  logging: false,
};
