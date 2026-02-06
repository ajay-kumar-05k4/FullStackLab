const http = require('http');
 const data = { 
    message: "Hello from Node.js!",
    age: 24 
  };
  
// http.createServer((req, res) =>{
//     res.write("WElcome");
//     res.end();
// }).listen(6000, ()=>console.log('server ready...'))
http.createServer((req, res) => {
     res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log("TEST")
 
  res.end(JSON.stringify(data));
}).listen(4000, () => {
  console.log("Server running at http://localhost:4000");
});
