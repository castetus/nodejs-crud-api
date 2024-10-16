export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum ServerCodes {
  SUCCESS = 200,
  SUCCESS_CREATE = 201,
  SUCCESS_DELETE = 204,
  CLIENT_ERROR = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
}