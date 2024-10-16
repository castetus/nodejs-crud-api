import { IncomingMessage, ServerResponse } from 'node:http';
import { Methods, ServerCodes } from './types.js';
// import * from './controllers.js';

export const routes: Record<string, unknown> = {
  'users': '',
  'user/:id': '',
};

class Router {

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    if (!method || !url) {
      return;
    }
    if (!routes[url]) {
      res.statusCode = ServerCodes.NOT_FOUND;
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
    switch (url) {
      case Methods.GET:
        return this.get(url);
      case Methods.POST:
        return this.post(url);
    }
  };
  
  get(url) {
    return routes();
  };

  post(url) {

  };

  put(req, res) {

  };

  delete(req, res) {

  };
};

export default new Router();