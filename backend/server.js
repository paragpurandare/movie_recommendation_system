const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlPool = require('./config/sql_db');
const dotenv = require('dotenv');
const apiRoutes = require('./routes/api');
const rateLimiter = require('./middlewares/rateLimiter');
const app = express();
const path = require('path');
dotenv.config();


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));


const PORT = process.env.PORT || 5000;



app.use(rateLimiter);
app.use('/api', apiRoutes);


app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
});

