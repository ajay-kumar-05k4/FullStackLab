const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.url === '/read') {
    fs.readFile('output.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end('Error reading file');
        return;
      }

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Go to /read to read file data');
  }
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
