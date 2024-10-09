const express = require("express");
const db = require("./db");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

var app = express();

var jsonParser = bodyParser.json();

app.use(cors());

app.get("/blogs", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/blogs", jsonParser, async (req, res) => {
  try {
    await db.query(
      "INSERT INTO blogs(title, subtitle, body, report_type, is_primary, publisher_name, publisher_job) " +
        "VALUES ($1, $2, $3, $4, $5, $6, $7) ",
      [
        req.body.title,
        req.body.subtitle,
        req.body.body,
        req.body.report_type,
        req.body.is_primary,
        req.body.publisher_name,
        req.body.publisher_job,
      ]
    );
    res.status(200).json({
      message: "Blog was inserted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/blogs", jsonParser, async (req, res) => {
  try {
    const id = Number(req.url.split("=")[1]);
    await db.query(
      "UPDATE blogs " +
        "SET title = $1, subtitle = $2, body = $3, report_type = $4, is_primary = $5, publisher_name = $6, publisher_job = $7 " +
        "WHERE id = $8",
      [
        req.body.title,
        req.body.subtitle,
        req.body.body,
        req.body.report_type,
        req.body.is_primary,
        req.body.publisher_name,
        req.body.publisher_job,
        id,
      ]
    );
    res.status(200).json({
      message: "Blog was inserted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
