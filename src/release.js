const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const port = 3000;
const js_code = fs.readFileSync("dist/index.js","utf-8").toString()

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});
  fs.readFile('index.ejs', (err, data) => {
     const output = ejs.render(data.toString(), {code:js_code})  
     res.end(output)
    if (err) throw err;
  });
});

server.listen(port, () => {

  console.log(`打开发布到动态js  http://127.0.0.1:${port}`);
});