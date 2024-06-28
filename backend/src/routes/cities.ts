import {Router, Request, Response} from "express";
import pool from "../db/db";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect();
    const query = "SELECT * FROM cities ORDER BY city_name";
    const result = await client.query(query);
    const cities = result.rows;
    client.release();
    res.json(cities);
  } catch (err) {
    console.error("Error fetching cities:", err);
    res.status(500).send("Error fetching cities");
  }
});

// Belirli bir şehrin ilçelerini getirme
router.get("/:cityId/districts", async (req: Request, res: Response) => {
  const cityId = parseInt(req.params.cityId, 10);

  try {
    const client = await pool.connect();
    const query = {
      text: "SELECT * FROM districts WHERE city_id = $1 ORDER BY district_name",
      values: [cityId],
    };
    const result = await client.query(query);
    const districts = result.rows;
    client.release();
    res.json(districts);
  } catch (err) {
    console.error(`Error fetching districts for city ${cityId}:`, err);
    res.status(500).send(`Error fetching districts for city ${cityId}`);
  }
});

export default router;
