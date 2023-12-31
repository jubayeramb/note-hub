import { type PoolOptions, createPool } from "mysql2/promise";

const dbConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: Number(process.env.DB_PORT),
  multipleStatements: true,
};

export const connectDb = async () => {
  const connection = await createPool(dbConfig);
  console.log("Database connected");
  return connection;
};
