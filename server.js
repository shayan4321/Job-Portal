//imports
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors')

// Files Imports
const connectDB = require('./config/db');
const testRoutes = require('./routes/testRoutes')

// Dot ENV config
dotenv.config();

// mongodb connection
connectDB();

//rest Object
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Morgan config
app.use(morgan('dev'));

// ============================= routes ================
// app.get('/', (req,res) =>{
//     res.send("<h1>Welcome to Job Portal</h1>")
// });

app.use('/api/v1/test', testRoutes)

// PORT
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, () =>{
    console.log(`Server is running on ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgGreen.white);
})