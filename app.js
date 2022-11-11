const Server = require("./Models/Server");

require("dotenv").config();

const server = new Server();

server.listen();

module.exports = Server;
