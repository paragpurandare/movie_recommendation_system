const { Pool } = require('pg');

const pool = new Pool({
  user: 'movieuser',
  host: 'localhost',
  database: 'moviedb',
  password: 'pp191919',
  port: 5432,
});

// Test connection and log result
pool.query('SELECT 1')
  .then(() => console.log('✅ Connected to PostgreSQL database'))
  .catch((err) => console.error('❌ Failed to connect to PostgreSQL database:', err));

module.exports = pool;
