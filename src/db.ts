import type { IUser } from "./types.js";
import { v4 as uuidv4 } from 'uuid';

type UserData = Omit<IUser, 'id'>;

class Db {
  users: IUser[] = [];

  getAllUsers(): IUser[] {
    return this.users;
  };

  getSingleUser(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  };

  createNewUser(userData: UserData) {
    const id = uuidv4();
    const newUser = {
      ...userData,
      id,
    };
    this.users.push(newUser);
  };

  updateUser(userData: UserData, id: string) {
    const existedUser = this.users.find((user) => user.id === id);
    if (existedUser) {
      Object.assign(existedUser, userData);
    }
  };

  deleteUser(id: string) {
    const deletedUserIndex = this.users.findIndex((user) => user.id === id);
    if (deletedUserIndex !== -1) {
      this.users.splice(deletedUserIndex, 1);
    }
  };
}

export default new Db();