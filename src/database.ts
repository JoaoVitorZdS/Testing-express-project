import { Client } from "pg";
import "dotenv/config";

export const client: Client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT!),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

export const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};
