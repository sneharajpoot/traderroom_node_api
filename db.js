const sql = require('mssql'); 


// MSSQL Configuration for Windows Authentication
// Database configuration
const config = {
  
  user: process.env.DB_USER , // UserID
  password: process.env.DB_PASSWORD, // Password
  server: process.env.DB_HOST, // Data Source (IP address)
  database: process.env.DB_NAME, // Initial Catalog
 
  options: {
      encrypt: false, // Set to true if using Azure
      trustServerCertificate: true // Use this for self-signed certificates
  }
};

// Create a connection pool and export it
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log('Connected to MSSQL Database: ' + process.env.DB_NAME);
    return pool;
  })
  .catch((err) => {
    console.error('Database Connection Failed: ', err.message);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
