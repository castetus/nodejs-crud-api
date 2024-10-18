import { IncomingMessage, ServerResponse } from 'node:http';
import { Methods, ServerCodes } from './types.js';
import {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
} from './controllers.js';
import { checkId, checkUser } from "./utils.js";

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

    const [ base, endpoint, id ] = url.replace('/', '').split('/');
    console.log(base, endpoint, id)
    // if (id) {
    //   const isIdValid = checkId(id);
    //   if (!isIdValid) {
    //     res.statusCode = ServerCodes.CLIENT_ERROR;
    //     res.end('User id is not valid id');
    //     return;
    //   }

    //   const userExist = checkUser(id);
    //   if (!userExist) {
    //     res.statusCode = ServerCodes.NOT_FOUND;
    //     res.end('User doesn`t exist');
    //     return;
    //   }
    // }

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
        this.put(req, res, id);
      case Methods.DELETE:
        this.delete(id, res);
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
    createNewUser(req, res);
  };

  put(req: IncomingMessage, res: ServerResponse, id: string) {
    updateUser(req, res, id);
  };

  delete(id: string, res: ServerResponse) {
    deleteUser(id, res);
  };
};

// export default new Router();