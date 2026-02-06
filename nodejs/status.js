const http = require('http');

const server = http.createServer((req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Welcome!' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: '404 Not Found' }));
    }
  } catch (err) {
    
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: '500 Internal Server Error' }));
  }
});

server.listen(7000, () => {
  console.log('Server running at http://localhost:7000');
});
