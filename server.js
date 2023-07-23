const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./src/db/db');
const postRoutes = require('./src/routes/postRoutes');
const errorHandler = require('./src/middleware/errorHandlers');

const app = express();

//Db connection
Database()

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/posts', postRoutes);

//Error handling middleware
app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server is listening at port: 8080')
});
