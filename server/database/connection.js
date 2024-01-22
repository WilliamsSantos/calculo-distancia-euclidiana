'use strict';

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

const exec = async (sql, params = []) => {
    try {
    const { rows } = await pool.query(sql, params);
    return [rows, null];
  } catch (error) {
    return [null, error];
  }
};

module.exports = { exec };
