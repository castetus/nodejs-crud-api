import { createServer } from 'node:http';

export const app = createServer((req, res) => {
  console.log(req, res);
});