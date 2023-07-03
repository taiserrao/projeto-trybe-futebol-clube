import { Request, Response } from 'express';
import IUserService from '../interfaces/IUserService';

export default class UserController {
  constructor(private _loginService: IUserService) {}
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, message } = await this._loginService.login(email, password);
    if (status) return res.status(status).json({ message });

    return res.status(200).json({ token: message });
  }

  public static async getRole(req: Request, res: Response) {
    const { data } = req.body;

    return res.status(200).json({ role: data.payload.role });
  }
}
