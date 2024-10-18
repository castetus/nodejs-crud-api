import db from "./db.js";
import { IncomingMessage, ServerResponse } from 'node:http';
import type { IUser } from "./types.js";
import { v4 as uuidv4 } from 'uuid';
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
  try {
    const data = db.getSingleUser(id);
    if (data) {
      res.statusCode = ServerCodes.SUCCESS;
      res.end(JSON.stringify(data));
      return;
    }
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
    const { username, age, hobbies } = userData;
    if (!username || !age || !hobbies) {
      res.statusCode = ServerCodes.CLIENT_ERROR;
      res.end('Invalid data');
      return;
    }
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

export const deleteUser = (id: string, res: ServerResponse) => {
  try {
    db.deleteUser(id);
    res.statusCode = ServerCodes.SUCCESS_DELETE;
    res.end('User successfully deleted');
  } catch (error) {
    
  }
}