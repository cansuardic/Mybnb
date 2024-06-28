import {Router, Request, Response} from "express";
import pool from "../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM categories ORDER BY category_name";
    const result = await client.query(query);
    const cities = result.rows;
    client.release();
    res.json(cities);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).send("Error fetching categories");
  }
});

export default router;
