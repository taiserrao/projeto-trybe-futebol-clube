import jwt = require('jsonwebtoken');
import IUser from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: jwt.SignOptions = {
  algorithm: 'HS256',
  expiresIn: '1d',
};

export default class auth {
  public static generateToken = (payload: IUser) => {
    const token = jwt.sign({ payload }, secret, jwtConfig);
    return token;
  };

  public static verifyToken = (token: string) => {
    if (!token) return { message: 'Token not found' };
    const tokenVerification = jwt.verify(token, secret);
    return tokenVerification;
  };
}
