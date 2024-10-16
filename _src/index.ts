import http from 'node:http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

console.log(PORT, BASE_URL)

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/${BASE_URL}`);
});