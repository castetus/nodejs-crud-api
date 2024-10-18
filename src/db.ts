import type { IUser } from "./types.js";

type UserData = Omit<IUser, 'id'>;

const mockUsers = [
  {
    id: '13123',
    username: 'rtyrty',
    age: 121,
    hobbies: [
      'rtytyty'
    ]
  }
]

class Db {
  users: IUser[] = mockUsers;

  getAllUsers(): IUser[] {
    return this.users;
  };

  getSingleUser(id: string): IUser | undefined {
    console.log(this.users, id)
    return this.users.find((user) => user.id === id);
  };

  createNewUser(newUser: IUser) {
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