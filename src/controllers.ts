import db from "./db.js";
import { IncomingMessage, ServerResponse } from 'node:http';
import type { IUser } from "./types.js";
import { v4 as uuidv4 } from 'uuid';
import { checkId } from "./utils.js";
import { ServerCodes } from './types.js';

type UserData = Omit<IUser, 'id'>;

export const getAllUsers = (res: ServerResponse) => {
  try {
    const data = db.getAllUsers();
    res.statusCode = ServerCodes.SUCCESS;
    res.write(JSON.stringify(data));
    res.end();
  } catch (error) {
    console.log(error);
  }
  return db.getAllUsers();
};

export const getUserById = (id: string, res: ServerResponse) => {
  const isIdValid = checkId(id);
  if (!isIdValid) {
    res.statusCode = ServerCodes.CLIENT_ERROR;
    res.end('User id is not valid id');
  }
  try {
    const data = db.getSingleUser(id);
    if (data) {
      res.statusCode = ServerCodes.SUCCESS;
      res.end(JSON.stringify(data));
      return;
    }
    res.statusCode = ServerCodes.NOT_FOUND;
    res.end('User not found');
  } catch (error) {
    console.log(error);
  }
};

export const createNewUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';
  req.on('data', (chunk) => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const id = uuidv4();
    const userData = JSON.parse(body) as UserData;
    const newUser = {
      ...userData,
      id,
    };
    db.createNewUser(newUser);
    res.statusCode = ServerCodes.SUCCESS_CREATE;
    res.end(JSON.stringify(newUser));
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse, id: string) => {
  
};