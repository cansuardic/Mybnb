import {Pool} from "pg";

/**
 * // PostgreSQL bağlantı ayarları (build)
 * const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "mybnb",
  password: "postgres",
  port: 5432,
});
 */

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mybnb",
  password: "postgres",
  port: 5432,
});

export default pool;
