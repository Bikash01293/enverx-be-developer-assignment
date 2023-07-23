const mongoose = require('mongoose');

//Connect to MongoDB

const Db = () => {
    mongoose
    .connect('mongodb+srv://Bikash:eHgsFtW9ZfkTrhkS@cluster0.tkyal5s.mongodb.net/blogs', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}

module.exports = Db;

