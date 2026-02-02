import { Pool } from "pg";

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "40104010",
  database: "todo_db",
  port: 5432
});