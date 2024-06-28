import express, {Request, Response} from "express";
import {QueryResult} from "pg";
import pool from "../db/db";
const router = express.Router();

// Booking API for user & property
router.post(
  "/property/:propertyId/book",
  async (req: Request, res: Response) => {
    const propertyId: number = parseInt(req.params.propertyId, 10);
    const {
      userId,
      checkInDate,
      checkOutDate,
    }: {userId: number; checkInDate: any; checkOutDate: any} = req.body;

    try {
      const propertyQuery: string =
        "SELECT * FROM properties WHERE property_id = $1";
      const propertyResult: QueryResult<any> = await pool.query(propertyQuery, [
        propertyId,
      ]);
      const property: any = propertyResult.rows[0];

      if (!property) {
        return res.status(404).json({error: "Property not found"});
      }

      // Check if payment exists for the property
      const checkPaymentQuery: string =
        "SELECT * FROM payments WHERE property_id = $1 AND user_id = $2";
      const checkPaymentResult: QueryResult<any> = await pool.query(
        checkPaymentQuery,
        [propertyId, userId]
      );

      if (checkPaymentResult.rows.length === 0) {
        return res
          .status(400)
          .json({error: "Payment not found for the property"});
      }

      // Insert booking record
      const bookingQuery: string = `
        INSERT INTO bookings (user_id, property_id, check_in_date, check_out_date)
        VALUES ($1, $2, $3, $4)
        RETURNING booking_id`;
      const bookingValues: (number | string | Date)[] = [
        userId,
        propertyId,
        checkInDate,
        checkOutDate,
      ];
      const bookingResult: QueryResult<{booking_id: number}> = await pool.query(
        bookingQuery,
        bookingValues
      );
      const bookingId: number = bookingResult.rows[0].booking_id;

      res.json({
        booking_id: bookingId,
        property_id: propertyId,
        check_in_date: checkInDate,
        check_out_date: checkOutDate,
      });
    } catch (err) {
      console.error("Error booking property:", err);
      res.status(500).send("Error booking property");
    }
  }
);

// Get Bookings of User
router.get("/:userId", async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);

  try {
    const query: string = `
      SELECT b.booking_id, b.property_id, p.property_name, b.check_in_date, b.check_out_date, b.is_approved 
      FROM bookings b
      JOIN properties p ON b.property_id = p.property_id
      WHERE b.user_id = $1
      ORDER BY b.check_in_date DESC`;
    const result: QueryResult<any> = await pool.query(query, [userId]);
    const bookings: any[] = result.rows;

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).send("Error fetching bookings");
  }
});

export default router;
