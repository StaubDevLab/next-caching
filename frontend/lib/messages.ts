import pg from 'pg'

const { Pool } = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function addMessage(message : string) {
    await pool.query(`INSERT INTO messages (message) VALUES ('${message}')`);

}

export async  function getMessages() {
    console.log('Fetching messages from db');
    const { rows } = await pool.query('SELECT * FROM news');
    return rows
}
