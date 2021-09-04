const app = require('./app.js');
const db = require('./database.js');

const port = process.env.PORT || 8080;

(async () => {
  try {
    await db.connect();
    console.log("Database Connection Successfull!!!!!");
    const server = require('http').createServer(app);
    server.listen(port);
    console.log("Server Listening on port:", port);
  } catch (error) {
    console.error("Error while connecting database", error);
    process.exit(1);
  }
})()
