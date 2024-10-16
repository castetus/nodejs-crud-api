import { createServer } from 'node:http';
import Router from './router.js';

export const app = createServer((req, res) => {
  try {
    const { method, url } = req;
    // router(req, res)
    console.log(method, url)
  } catch (error) {
    
  }
});