const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./src/routes/postRoutes');
const errorHandler = require('./src/middleware/errorHandlers');

const app = express();

//Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

//Middleware
app.use(bodyParser.json());

//Routes
app.use('/posts', postRoutes);

//Error handling middleware
app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server is listening at port: 8080')
});
