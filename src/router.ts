import { IncomingMessage, ServerResponse } from 'node:http';
import { Methods } from './types.js';
// import * from './controllers.js';

// export const routes = {
//   'users': getAllUsers,
//   'user/:id': getUserById,
// };

class Router {

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    switch (req.method) {
      case Methods.GET:
        return this.get(req.url, res);
      case Methods.POST:
        return this.post(req.url, res);
    }
  };
  
  get(url, res) {
    return routes()
  };

  post(req, res) {

  };

  put(req, res) {

  };

  delete(req, res) {

  };
};

export default new Router();