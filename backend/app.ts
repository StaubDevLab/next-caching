import express from 'express';
import pg from 'pg';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;
interface MessageItem {
  id: number;
  text: string;

}

const DUMMY_MESSAGES: Omit<MessageItem, 'id'>[] = [
  {
    text: 'Great message',

  },{
    text: 'Great message',

  },{
    text: 'Great message',

  },

];

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        text TEXT)
    `);

    const { rows } = await client.query('SELECT COUNT(*) as count FROM news');
    if (parseInt(rows[0].count) === 0) {
      const insertQuery = `
        INSERT INTO news (text)
        VALUES ($1)
      `;

      for (const message of DUMMY_MESSAGES) {
        await client.query(insertQuery, [message.text]);
      }
    }
  } finally {
    client.release();
  }
}
const app = express();

app.get('/messages',async (req, res) => {
  const requestSource = req.headers['x-id'];
  console.log(`${new Date().toISOString()}: EXECUTING /messages on backend from ${requestSource}`);
  const {rows} = await pool.query('SELECT * FROM news');

  res.json(rows);
});

initDb().then(() => {
  app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
  });
}).catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});
