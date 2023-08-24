const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.Promise = global.Promise;
mongoose.set('strictQuery', false);

mongoose.connect(config.URI, { useNewUrlParser: true, useUnifiedTopology: true });

const connectDB = mongoose.connection;

connectDB.on('error', (error) => console.error('Connection error:', error));
connectDB.once('open', () => console.log('Connected to database'));

module.exports = connectDB;