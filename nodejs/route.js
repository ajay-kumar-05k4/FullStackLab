const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url); 

  if (req.url === '/') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Welcome to Home Page');
  } 
  else if (req.url === '/about') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('This is About Page');
  } 
  else if (req.url === '/contact') {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end('Contact us');
  } 
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end('404 Page Not Found');
  }
});

server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
