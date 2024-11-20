require("dotenv").config();
// const { Pool } = require("pg");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.PUBLIC_SUPABASE_URL,
  process.env.PUBLIC_SUPABASE_KEY
);

// const pool = new Pool({
//   user: process.env.PUBLIC_POSTGRES_USER,
//   password: process.env.PUBLIC_POSTGRES_PASSWORD,
//   host: process.env.PUBLIC_POSTGRES_HOST,
//   port: process.env.PUBLIC_PG_PORT,
//   database: process.env.PUBLIC_POSTGRES_DATABASE,
// });

module.exports = {
  supabase,
  // query: (text, params) => pool.query(text, params),
};
