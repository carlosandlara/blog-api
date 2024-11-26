// const env = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_KEY
);

const app = express();
var jsonParser = bodyParser.json();
app.use(cors());

app.get("/", (req, res) => {
  res.send(`Hola ${process.env}`);
});

app.get("/blogs", async (req, res) => {
  try {
    const result = await supabase.from("blogs").select();
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const result = await supabase
      .from("blogs")
      .select()
      .eq("id", req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/blogs", jsonParser, async (req, res) => {
  try {
    const result = await supabase.from("blogs").insert({
      title: req.body.title,
      subtitle: req.body.subtitle,
      body: req.body.body,
      report_type: req.body.reportType,
      is_primary: req.body.isPrimary,
      publisher_name: req.body.publisherName,
      publisher_job: req.body.publisherJob,
    });
    res.status(200).json({
      message: "Blog was created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/blogs/:id", jsonParser, async (req, res) => {
  try {
    const result = await supabase
      .from("blogs")
      .update({
        title: req.body.title,
        subtitle: req.body.subtitle,
        body: req.body.body,
        report_type: req.body.reportType,
        is_primary: req.body.isPrimary,
        publisher_name: req.body.publisherName,
        publisher_job: req.body.publisherJob,
      })
      .eq("id", req.params.id);
    res.status(200).json({
      message: "Blog was updated successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});

module.exports = app;
