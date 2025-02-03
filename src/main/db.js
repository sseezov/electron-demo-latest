import pg from 'pg';

const { Client } = pg;

const client = new Client({
  user: 'postgres',
  password: '219219',
  host: 'localhost',
  port: '5432',
  database: 'demo_2025',
});

await client.connect();

export default client;
