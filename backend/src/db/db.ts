import {Pool} from "pg";


 const pool = new Pool({
  connectionString : process.env.POSTGRESQL_URL + "?ssl=true"
});
 

// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "mybnb",
//   password: "postgres",
//   port: 5432,
// });

export default pool;
