import { type ConnectionOptions, createPool } from "mysql2/promise";

const dbConfig: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const connectDb = async () => {
  try {
    const connection = await createPool(dbConfig);
    console.log("Database connected");
    return connection;
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};

export default connectDb;
