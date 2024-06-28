import express, {Request, Response} from "express";
import {QueryResult} from "pg";
import pool from "../db/db";
const router = express.Router();

async function registerUser(
  first_name: string,
  last_name: string,
  email: string,
  phone_number: string,
  password: string,
  birth_date: string
): Promise<boolean> {
  try {
    const client = await pool.connect();

    const checkUserQuery = "SELECT * FROM users WHERE email = $1";
    const checkUserResult = await client.query(checkUserQuery, [email]);

    if (checkUserResult.rows.length > 0) {
      client.release();
      return false; // User with this email already exists
    }

    const insertUserQuery = `
      INSERT INTO users (first_name, last_name, email, phone_number, password, birth_date)
      VALUES ($1, $2, $3, $4, $5, $6)`;
    const insertUserValues = [
      first_name,
      last_name,
      email,
      phone_number,
      password,
      birth_date,
    ];
    await client.query(insertUserQuery, insertUserValues);

    client.release();
    return true; // User registered successfully
  } catch (error) {
    console.error("Error during registration:", error);
    return false;
  }
}

async function loginUser(email: string, password: string): Promise<any> {
  try {
    const client = await pool.connect();
    const query = {
      text: "SELECT * FROM users WHERE email = $1 AND password = $2",
      values: [email, password],
    };
    const result: QueryResult = await client.query(query);
    client.release();

    if (result && result.rowCount && result.rowCount > 0) {
      return result.rows;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
}

router.post("/register", async (req: Request, res: Response) => {
  const {first_name, last_name, email, phone_number, password, birth_date} =
    req.body;
  const success = await registerUser(
    first_name,
    last_name,
    email,
    phone_number,
    password,
    birth_date
  );
  if (success) {
    res.json({message: "Registration successful"});
  } else {
    res.status(500).json({message: "Registration error"});
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const {email, password} = req.body;
  const userData = await loginUser(email, password);
  if (userData) {
    res.json({message: "Login successful", user: userData[0]});
  } else {
    res.status(401).json({message: "Login failed"});
  }
});

export default router;
