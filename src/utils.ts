import { validate } from 'uuid';
import db from "./db.js";

export const checkId = (id: string) => {
  return validate(id);
};

export const checkUser = (id: string) => {
  return db.getSingleUser(id);
};