import express, {Request, Response, Router} from "express";
import pool from "../db/db";

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = `
      SELECT p.property_id, p.property_name, p.room_count, p.bed_count, p.price, p.description,
             c.city_name, d.district_name, cat.category_name, pt.type_name
      FROM properties p
      LEFT JOIN cities c ON p.city_id = c.city_id
      LEFT JOIN districts d ON p.district_id = d.district_id
      LEFT JOIN categories cat ON p.category_id = cat.category_id
      LEFT JOIN property_type pt ON p.type_id = pt.type_id ORDER BY p.property_id ASC`;

    const client = await pool.connect();
    const result = await client.query(query);
    const properties = result.rows;
    client.release();

    res.json(properties);
  } catch (err) {
    console.error("Error fetching properties:", err);
    res.status(500).send("Error fetching properties");
  }
});

router.get("/:propertyId", async (req, res) => {
  const propertyId = req.params.propertyId;

  try {
    // Fetch property details
    const propertyQuery = `
      SELECT p.property_id, p.property_name, p.room_count, p.bed_count, p.price, p.description,
             c.city_name, d.district_name, cat.category_name, pt.type_name
      FROM properties p
      LEFT JOIN cities c ON p.city_id = c.city_id
      LEFT JOIN districts d ON p.district_id = d.district_id
      LEFT JOIN categories cat ON p.category_id = cat.category_id
      LEFT JOIN property_type pt ON p.type_id = pt.type_id
      WHERE p.property_id = $1`;
    const propertyResult = await pool.query(propertyQuery, [propertyId]);
    const property = propertyResult.rows[0];

    if (!property) {
      return res.status(404).json({error: "Property not found"});
    }

    // Fetch photos for the property
    const photosQuery = "SELECT * FROM property_photos WHERE property_id = $1";
    const photosResult = await pool.query(photosQuery, [propertyId]);
    const photos = photosResult.rows;

    // Combine property details with photos
    const propertyWithDetails = {
      property_id: property.property_id,
      property_name: property.property_name,
      room_count: property.room_count,
      bed_count: property.bed_count,
      price: property.price,
      description: property.description,
      city: property.city_name,
      district: property.district_name,
      category: property.category_name,
      type: property.type_name,
      photos: photos,
    };

    res.json(propertyWithDetails);
  } catch (err) {
    console.error(
      `Error fetching property details for propertyId ${propertyId}:`,
      err
    );
    res
      .status(500)
      .send(`Error fetching property details for propertyId ${propertyId}`);
  }
});

router.get("/category/:categoryId", async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  try {
    const client = await pool.connect();
    const query = {
      text: "SELECT * FROM properties WHERE category_id = $1",
      values: [categoryId],
    };
    const result = await client.query(query);
    const properties = result.rows;
    client.release();
    res.json(properties);
  } catch (err) {
    console.error(`Error fetching properties for category ${categoryId}:`, err);
    res
      .status(500)
      .send(`Error fetching properties for category ${categoryId}`);
  }
});

router.get(
  "/category/:categoryId/city/:cityId",
  async (req: Request, res: Response) => {
    const categoryId = req.params.categoryId;
    const cityId = req.params.cityId;

    try {
      const client = await pool.connect();
      const query = {
        text: `
        SELECT p.*, c.city_name, d.district_name, cat.category_name, pt.type_name
        FROM properties p
        JOIN cities c ON p.city_id = c.city_id
        JOIN districts d ON p.district_id = d.district_id
        JOIN categories cat ON p.category_id = cat.category_id
        JOIN property_types pt ON p.type_id = pt.type_id
        WHERE p.category_id = $1 AND p.city_id = $2
        ORDER BY p.property_id
      `,
        values: [categoryId, cityId],
      };
      const result = await client.query(query);
      const properties = result.rows;
      client.release();
      res.json(properties);
    } catch (err) {
      console.error(
        `Error fetching properties for category ${categoryId} and city ${cityId}:`,
        err
      );
      res
        .status(500)
        .send(
          `Error fetching properties for category ${categoryId} and city ${cityId}`
        );
    }
  }
);

export default router;
