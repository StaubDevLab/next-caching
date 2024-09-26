import pg from 'pg'
import {Message} from "@/@types/Message";
import {cache} from 'react'
import {unstable_cache} from "next/cache";

const {Pool} = pg;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

export async function addMessage(message: string) {
    await pool.query(`INSERT INTO news (text)
                      VALUES ($1)`, [message]);


}

export const getMessages = unstable_cache(cache(async function getMessages(): Promise<Message[]> {
    console.log('Fetching messages from db');

    const {rows} = await pool.query('SELECT * FROM news');
    return rows;

}), ['messages'])
