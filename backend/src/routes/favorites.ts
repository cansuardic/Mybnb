import express, {Request, Response} from "express";
import pool from "../db/db";
const router = express.Router();

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const query = `
      SELECT p.property_id, p.property_name, p.room_count, p.bed_count, p.price, p.description,
             c.city_name, d.district_name, cat.category_name, pt.type_name
      FROM favorites f
      INNER JOIN properties p ON f.property_id = p.property_id
      LEFT JOIN cities c ON p.city_id = c.city_id
      LEFT JOIN districts d ON p.district_id = d.district_id
      LEFT JOIN categories cat ON p.category_id = cat.category_id
      LEFT JOIN property_type pt ON p.type_id = pt.type_id
      WHERE f.user_id = $1`;

    const client = await pool.connect();
    const result = await client.query(query, [userId]);
    const favorites = result.rows;
    client.release();

    res.json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).send("Error fetching favorites");
  }
});

router.post("/add", async (req, res) => {
  const {userId, propertyId} = req.body;

  try {
    // Check if the favorite already exists
    const checkFavoriteQuery = `
      SELECT * FROM favorites 
      WHERE user_id = $1 AND property_id = $2`;
    const checkFavoriteValues = [userId, propertyId];
    const client = await pool.connect();
    const checkResult = await client.query(
      checkFavoriteQuery,
      checkFavoriteValues
    );

    if (checkResult.rows.length > 0) {
      return res.status(400).json({error: "Property already in favorites"});
    }

    // Insert favorite
    const insertFavoriteQuery = `
      INSERT INTO favorites (user_id, property_id)
      VALUES ($1, $2)
      RETURNING *`;
    const insertFavoriteValues = [userId, propertyId];
    const insertResult = await client.query(
      insertFavoriteQuery,
      insertFavoriteValues
    );
    const favorite = insertResult.rows[0];

    client.release();
    res.status(201).json(favorite);
  } catch (err) {
    console.error("Error adding favorite:", err);
    res.status(500).send("Error adding favorite");
  }
});

router.delete("/remove", async (req: Request, res: Response) => {
  const {userId, propertyId} = req.body;

  try {
    // Check if the favorite exists
    const checkFavoriteQuery = `
      SELECT * FROM favorites 
      WHERE user_id = $1 AND property_id = $2`;
    const checkFavoriteValues = [userId, propertyId];
    const client = await pool.connect();
    const checkResult = await client.query(
      checkFavoriteQuery,
      checkFavoriteValues
    );

    if (checkResult.rows.length === 0) {
      client.release();
      return res.status(404).json({error: "Favorite not found"});
    }

    // Delete favorite
    const deleteFavoriteQuery = `
      DELETE FROM favorites 
      WHERE user_id = $1 AND property_id = $2
      RETURNING *`;
    const deleteFavoriteValues = [userId, propertyId];
    const deleteResult = await client.query(
      deleteFavoriteQuery,
      deleteFavoriteValues
    );
    const deletedFavorite = deleteResult.rows[0];

    client.release();
    res.json(deletedFavorite);
  } catch (err) {
    console.error("Error removing favorite:", err);
    res.status(500).send("Error removing favorite");
  }
});

export default router;
