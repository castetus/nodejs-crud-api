import { createServer } from 'node:http';
import Router from './router.js';

export const app = createServer((req, res) => {
  try {

    Router.handleRequest(method, url);
    // router(req, res)
    // console.log(method, url)
  } catch (error) {
    
  }
});