const http = require('http');

const server = http.createServer((req, res) => {
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    
  });

  res.end('<h1 style="color:red">Hello, World!</h1>');
});

server.listen(5000, () => {
  console.log('Server running at http://localhost:5000/');
});