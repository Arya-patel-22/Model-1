const http = require("http");

const fs = require("fs");

const server = http.createServer((request, response) => {

  fs.readFile(
    "home.html",
    (error, data) => {

      if (error) {

        response.write("Error loading file");

      }
      else {

        response.writeHead(200, {
          "Content-Type": "text/html"
        });

        response.write(data);

      }

      response.end();

    }
  );

});

server.listen(5000, () => {

  console.log("Server running on port 5000");

});