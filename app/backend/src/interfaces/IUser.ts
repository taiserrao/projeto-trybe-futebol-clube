import modelUsers from '../database/models/UsersModel';

export default interface IUser {
  mail: modelUsers['email'];
  password: modelUsers['password'];
  role?: modelUsers['role'];
}
