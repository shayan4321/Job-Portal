//imports
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');


// Files Imports
const connectDB = require('./config/db');

// Routes Imports
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const { errorMiddleware } = require('./moddlewares/errorMiddleware');

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


// app.get('/', (req,res) =>{
//     res.send("<h1>Welcome to Job Portal</h1>")
// });

// Routes
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

//validation middleware
app.use(errorMiddleware);

// PORT
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, () =>{
    console.log(`Server is running on ${process.env.DEV_MODE} Mode on port no ${PORT}`.bgGreen.white);
})