const fs = require('fs');
const path = require('path');
const {Pool} = require('pg');

const initPath =  path.join(__dirname, 'init.sql');
const initScript =  fs.readFileSync(initPath, 'utf-8');

export const runInitScript = async () => {
    const pool = new Pool({
        connectionString : process.env.POSTGRESQL_URL + "?ssl=true"
      });
    const client = await pool.connect();
    try {
        await client.query(initScript);
        console.log("Database values initialized successfully");
    } catch (error) {
        console.error("Error executing init script")
    } finally{
        client.release();
    }
}

