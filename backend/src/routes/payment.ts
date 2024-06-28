import express, {Request, Response} from "express";
import pool from "../db/db";
const router = express.Router();

// Payment
router.post(
  "/property/:propertyId/pay",
  async (req: Request, res: Response) => {
    const propertyId = req.params.propertyId;
    const {userId, amount} = req.body;

    try {
      const propertyQuery = "SELECT * FROM properties WHERE property_id = $1";
      const propertyResult = await pool.query(propertyQuery, [propertyId]);
      const property = propertyResult.rows[0];

      if (!property) {
        return res.status(404).json({error: "Property not found"});
      }

      // Insert payment record
      const paymentQuery = `
        INSERT INTO payments (user_id, property_id, amount)
        VALUES ($1, $2, $3)
        RETURNING payment_id`;
      const paymentValues = [userId, propertyId, amount];
      const paymentResult = await pool.query(paymentQuery, paymentValues);
      const paymentId = paymentResult.rows[0].payment_id;

      res.json({
        payment_id: paymentId,
        property_id: propertyId,
        amount: amount,
      });
    } catch (err) {
      console.error("Error making payment:", err);
      res.status(500).send("Error making payment");
    }
  }
);

export default router;
