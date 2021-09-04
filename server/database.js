const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

function connect() {
  return mongoose.connect("mongodb+srv://pingpong:7tXnhfQCyjXTHERu@cluster0.hjm9k.mongodb.net/deployment?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };