require("dotenv").config();
const { Pool } = require("pg");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_KEY
);

// const pool = new Pool({
//   user: process.env.PG_USER,
//   password: process.env.PG_PASS,
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   database: process.env.PG_DB_NAME,
// });

module.exports = {
  supabase,
  // query: (text, params) => pool.query(text, params),
};
