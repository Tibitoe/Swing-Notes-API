import pool from "../config/postgres.js";
import { sanitizeValues } from "../utils/utils.js";

export const executeQuery = async (query, values = []) => {
  const sanitizedValues = sanitizeValues(values);
  const client = await pool.connect();

  try {
    const response = await client.query(query, sanitizedValues);
    return response.rows;
  } catch (err) {
    console.error("Database query error:", err);
    throw err;
  } finally {
    client.release();
  }
};

export const createTables = async () => {
  try {
    await executeQuery("BEGIN");

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS profile (
        id SERIAL PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        username VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR NOT NULL,
        jwt_version INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await executeQuery(`
      CREATE TABLE IF NOT EXISTS note (
        id SERIAL PRIMARY KEY,
        title VARCHAR NOT NULL,
        text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      );
    `);

    await executeQuery("COMMIT");
  } catch (err) {
    await executeQuery("ROLLBACK");
    console.error(`Error creating tables: `, err);
  }
};
