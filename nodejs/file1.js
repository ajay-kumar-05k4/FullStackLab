const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/write') {
    const content = `Iam Ajay`;

    fs.writeFile('output.txt', content, (err) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end('Error writing to file');
        return;
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end('Data written to file successfully');
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Go to /write to write data into file');
  }
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
