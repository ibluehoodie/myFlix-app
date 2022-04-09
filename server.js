//Imports the HTTP module by assigning a variable
const http = require("http"),
//Use multiple modules in the same file with commas and implied variables
fs = require("fs"),
url = require("url");

//createServer() is a function taken form the HTTP module with two arguments: "request" and "response"
http.createServer((request, response) => {
  let addr = request.url,
  q = url.parse(addr, true),
  filePath = "";

  fs.appendFile("log.txt", "URL: " + addr + "\nTimestamp: " + new Date() + "\n\n", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Added to log.");
    }
  });

  if (q.pathname.includes("documentation")) {
    filePath = (__dirname + "/documentation.html");
  } else {
    filePath = "index.html";
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    //adds a header to the response that will be returned, along with HTTP status code 200 for "OK"
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();

  });

  //listens for a response on Port 8080
}).listen(8080);

//"http://127.0.0.1:8080/" or "localhost:8080/filename"
console.log("My test server is running on Port 8080.");
