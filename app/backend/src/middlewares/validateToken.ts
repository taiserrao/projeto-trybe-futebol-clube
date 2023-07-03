import { NextFunction, Request, Response } from 'express';
import auth from './auth';

export default class ValidateToken {
  public static tokenVerification(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    } try {
      const userToken = auth.verifyToken(token);
      req.body.data = userToken;
      next();
    } catch (err) {
      console.log(err);
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
