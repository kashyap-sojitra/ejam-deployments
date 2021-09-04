const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connect() {
  return mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };