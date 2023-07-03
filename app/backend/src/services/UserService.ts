import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import modelUsers from '../database/models/UsersModel';
import IUserService from '../interfaces/IUserService';
import auth from '../middlewares/auth';

export default class UserService implements IUserService {
  protected model: ModelStatic<modelUsers> = modelUsers;

  public async login(mail: string, password: string) {
    const data = await this.model.findOne({ where: { email: mail } });

    if (!data || !bcrypt.compareSync(password, data.dataValues.password)) {
      return { status: 401, message: 'Invalid email or password' };
    }

    const { role } = data.dataValues;
    const token = auth.generateToken({ mail, password, role });

    return { status: null, message: token };
  }
}
