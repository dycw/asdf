const http = require("http");

const server = http.createServer((req, res) => {
  console.log("request made");
});

server.listen(8000, "localhost", () => {
  console.log("listening for requests on port 8000");
});
