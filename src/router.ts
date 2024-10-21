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

const regex = /^\/api\/users(?:\/([^\/]+))?$/;

export class Router {

  handleRequest(req: IncomingMessage, res: ServerResponse) {
    const { method, url } = req;

    if (!method || !url) {
      return;
    }

    const isRouteExists = regex.test(url);

    if (!isRouteExists) {
      res.statusCode = ServerCodes.NOT_FOUND;
      res.end('Route doesn`t exists');
    }

    const [ base, endpoint, id ] = url.replace('/', '').split('/');

    if (id) {
      const isIdValid = checkId(id);
      if (!isIdValid) {
        res.statusCode = ServerCodes.CLIENT_ERROR;
        res.end('User id is not valid id');
      }

      const userExist = checkUser(id);
      if (!userExist) {
        res.statusCode = ServerCodes.NOT_FOUND;
        res.end('User doesn`t exist');
      }
    }

    switch (method) {
      case Methods.GET:
        this.get(id, res);
        break;
      case Methods.POST:
        this.post(req, res);
        break;
      case Methods.PUT:
        this.put(req, res, id);
        break;
      case Methods.DELETE:
        this.delete(id, res);
        break;
    }
  };
  
  get(id: string | undefined, res: ServerResponse) {
    if (id) {
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
