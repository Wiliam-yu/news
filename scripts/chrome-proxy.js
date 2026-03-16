// 简单的端口转发代理
const http = require('http');

const options = {
  hostname: '127.0.0.1',
  port: 9222,
  path: '/json',
  method: 'GET'
};

const server = http.createServer((req, res) => {
  const req2 = http.request(options, (res2) => {
    res.writeHead(res2.statusCode, res2.headers);
    res2.on('data', (chunk) => res.write(chunk));
    res2.on('end', () => res.end());
  });
  req.on('data', (chunk) => req2.write(chunk));
  req.on('end', () => req2.end());
});

server.listen(19222, '0.0.0.0', () => {
  console.log('代理已启动: 0.0.0.0:19222 -> 127.0.0.1:9222');
});
