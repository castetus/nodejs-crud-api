import { createServer } from 'node:http';
import { Router } from './router.js';
import { ServerCodes } from './types.js';

const router = new Router();

export const app = createServer((req, res) => {
  try {
    router.handleRequest(req, res);
  } catch (error) {
    res.statusCode = ServerCodes.SERVER_ERROR;
    res.end('Server error');
  }
});