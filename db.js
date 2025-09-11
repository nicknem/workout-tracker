require('dotenv').config();
const dbName = process.env.DB_NAME;

const { Client } = require(pg);
const client = new Client()
await client.connect()