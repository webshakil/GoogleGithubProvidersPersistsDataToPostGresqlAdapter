// import { Pool } from 'pg';

// const pool = new Pool({
//   connectionString: process.env.POSTGRES_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
// });

// export const dbConnect = async () => {
//   try {
//     const client = await pool.connect();
//     console.log('Connected to PostgreSQL');
//     return client;
//   } catch (error) {
//     console.error('PostgreSQL connection error:', error);
//     throw error;
//   }
// };

// // Utility to query the database
// export const query = async (text: string, params?: any[]) => {
//   const client = await dbConnect();
//   try {
//     const res = await client.query(text, params);
//     return res;
//   } finally {
//     client.release(); // Release client back to pool
//   }
// };

// export default pool;

// import { Pool } from 'pg';

// const pool = new Pool({
//   host: process.env.DATABASE_HOST,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD,
//   database: process.env.DATABASE_NAME,
//   max: 20,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// export default pool;

import { Pool } from 'pg';

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not defined in .env.local');
}

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Log connection attempt
console.log('Attempting to connect to PostgreSQL with:', process.env.POSTGRES_URL.replace(/:([^@]+)@/, ':****@')); // Mask password

pool.connect((err, client, release) => {
  if (err) {
    console.error('Failed to connect to PostgreSQL:', err.stack);
    return;
  }
  console.log('Connected to PostgreSQL successfully');
  release();
});

export const dbConnect = async () => {
  try {
    const client = await pool.connect();
    console.log('Client acquired from pool');
    return client;
  } catch (error) {
    console.error('PostgreSQL connection error:', error);
    throw error;
  }
};

export const query = async (text: string, params?: any[]) => {
  const client = await dbConnect();
  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};

export default pool;