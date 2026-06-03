const fs = require("fs");

fs.appendFile(
  "demo.txt",
  "Hello Arya, Form Silver Oak University",
  (error) => {

    if (error) {
      console.log(error);
    }
    else {
      console.log("File created successfully");
    }

  }
);