import { createPool, type Pool } from "mysql2/promise";

// Pool de MySQL tipado correctamente; expone .query, .execute, .end, etc.
export const db: Pool = createPool({
  host: "localhost",
  user: "root",
  password: "AsDf123@",
  database: "trading_journal",
});