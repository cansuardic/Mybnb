import express from "express";

import pool from "./db/db";

import auth from "./auth/index";
import bookingsRouter from "./routes/bookings";
import citiesRouter from "./routes/cities";
import favoritesRouter from "./routes/favorites";
import paymentRouter from "./routes/payment";
import propertiesRouter from "./routes/properties";
import categoriesRouter from "./routes/categories";
import { runInitScript } from "./db/dbInit";

require('./db/dbInit')

var cors = require("cors");

const app = express();
const port = 3200;

app.use(express.json());

app.use(cors());
app.options("*", cors());


app.get("/", (req, res) => {
  res.send("Hello from MyBnb!");
});

app.get("/db", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT NOW()");
    res.json(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.use("/auth", auth);
app.use("/properties", propertiesRouter);
app.use("/favorites", favoritesRouter);
app.use("/bookings", bookingsRouter);
app.use("/payment", paymentRouter);
app.use("/cities", citiesRouter);
app.use("/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);

  runInitScript();
});
