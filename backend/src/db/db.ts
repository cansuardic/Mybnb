import {Pool} from "pg";


 const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "mybnb",
  password: "postgres",
  port: 5431,
});
 

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "mybnb",
//   password: "postgres",
//   port: 5432,
// });

export default pool;
