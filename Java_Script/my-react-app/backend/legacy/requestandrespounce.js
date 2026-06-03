const http = require("http");

http.createServer((request, response) => {

  response.write("Node is Running Successfully");

  response.end();

}).listen(5000);