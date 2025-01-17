const express = require("express");
require("dotenv").config(); // Corrected dotenv import
// const axios = require("axios"); // Keep if planning to use
const bodyParser = require("body-parser"); // Keep if planning to use
const cors = require("cors"); // Keep if planning to use
const morgan = require('morgan');
console.log("superSecret", process.env.SECERET_KEY); // secret variable


const { sql, poolPromise } = require('./db'); // Import the connection


// Create an Express application
const app = express();
app.use(morgan('dev'));

// const database = require("./api/config/Database"); // Keep if planning to use

const Router = require("./routes")
// const pubRouter = require("./api/routes/pub");
// const { verifyToken } = require("./api/middleware/varifyUser");

//app.use(cors({origin:true})); // Add CORS middleware to allow cross-origin requests
const allowedOrigins = ["http://localhost:5173"];
//app.use(cors((origin:'*'));


app.use(bodyParser.json({ limit: '15mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

var corsOptions = {
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Log request URL and method
  console.log(` ${req.method} --> ${req.url} --> ${res.statusCode}`);
  // Continue to the next middleware
  next();
});
app.get("/", async (req, res) => {
  res.json({ message: "Backend Server Started Successfully! ", status: true });
});

// / Route to fetch data from a table
app.get('/users', async (req, res) => {
  try {
    const pool = await poolPromise; // Use the connection pool
    const result = await pool.request().query('SELECT * FROM Users'); // Replace 'Users' with your table name
    res.json(result.recordset);
  } catch (err) {
    console.error('Error querying database: ', err.message);
    res.status(500).send('Internal Server Error');
  }
});
// app.use("/api/pub", pubRouter.globalAirportDatabaseRoute);
// app.use("/api/pub", pubRouter.localDataRoute);
// app.use("/api/pub", pubRouter.flightQueryRoute);
// app.use("/api/pub", pubRouter.bookDemoRoute);
// app.use("/api/pub", pubRouter.fileUploadRoute);


// app.use("/api/auth", Router.authRouter);

// app.use(verifyToken);

// app.use("/api/send-quotation",(req, res, next)=>{
//   console.log('req.user',);
//   res.status(200).json({returns:true})
// });
 
app.use('/api',Router.ibRoute)
app.use('/api',Router.masterCopyRoutes)
// Start the server
//  const port = process.env.PORT || 8081;
const port =  8082;
app.listen(port, () => {
  console.log(`Server started on port http://localhost:${port}/`);
});
