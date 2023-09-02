// const ENV = require('../../config');

// mongoose config file
const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

mongoose.connect("mongodb+srv://pydamnaidu:cam29YlaSK3cRHqa@assignment.cjh6ckr.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
 
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;