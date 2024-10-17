import { IncomingMessage, ServerResponse } from 'node:http';
import { Methods, ServerCodes } from './types.js';
import {
  getAllUsers,
  getUserById,
  createNewUser,
} from './controllers.js';

const routes: Record<string, any> = {
  'users': getAllUsers,
  // 'user/:id': '',
};

export class Router {

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    if (!method || !url) {
      return;
    }
    // console.log(url, url.replace('/', '').split('/'))
    const [ base, endpoint, id ] = url.replace('/', '').split('/');
    // console.log(base, endpoint, id)
    if (!routes[endpoint]) {
      res.statusCode = ServerCodes.NOT_FOUND;
      res.write(JSON.stringify({ message: 'Route not found' }));
    }
    switch (method) {
      case Methods.GET:
        this.get(id, res);
      case Methods.POST:
        this.post(req, res);
      case Methods.PUT:
        this.put(req, res);
      case Methods.DELETE:
        this.delete(endpoint, res);
    }
  };
  
  get(id: string | undefined, res: ServerResponse) {
    if (id) {
      // console.log('test', id, typeof id)
      getUserById(id, res);
      return;
    }
    getAllUsers(res)
  };

  post(req: IncomingMessage, res: ServerResponse) {

  };

  put(req: IncomingMessage, res: ServerResponse) {

  };

  delete(url: string, res: ServerResponse) {

  };
};

// export default new Router();