import { IncomingMessage, ServerResponse } from 'node:http';
import { Methods, ServerCodes } from './types.js';
import {
  getAllUsers,
} from './controllers.js';

const routes: Record<string, () => {}> = {
  '/users': getAllUsers,
  // 'user/:id': '',
};

export class Router {

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;
    // console.log(method, url)
    if (!method || !url) {
      return;
    }

    const normalizedUrl = url.replace('/api', '');

    if (!routes[normalizedUrl]) {
      res.statusCode = ServerCodes.NOT_FOUND;
      res.end(JSON.stringify({ message: 'Route not found' }));
    }
    switch (method) {
      case Methods.GET:
        this.get(normalizedUrl, res);
      // case Methods.POST:
      //   return this.post(url);
    }
  };
  
  get(url: string, res: ServerResponse) {

    const data = routes[url]();
    res.statusCode = ServerCodes.SUCCESS;
    res.end(JSON.stringify(data));
  };

  // post(url) {

  // };

  // put(req, res) {

  // };

  // delete(req, res) {

  // };
};

// export default new Router();