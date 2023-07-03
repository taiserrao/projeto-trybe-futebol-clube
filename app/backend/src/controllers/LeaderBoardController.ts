import { Request, Response } from 'express';
import ILeaderBoardController from '../interfaces/ILeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController implements ILeaderBoardController {
  constructor(private _leaderBoardService: LeaderBoardService) {}

  public async getHome(_req: Request, res: Response) {
    const data = await this._leaderBoardService.getHome();

    if (data.length === 0) {
      return res.status(404).json({ message: 'Not Found' });
    }
    return res.status(200).json(data);
  }

  public async getAway(_req: Request, res: Response) {
    const data = await this._leaderBoardService.getAway();

    if (data.length === 0) return res.status(404).json({ message: 'Not Found' });

    return res.status(200).json(data);
  }

  public async getAllTeams(_req: Request, res: Response) {
    const data = await this._leaderBoardService.getAllTeams();

    if (data.length === 0) return res.status(404).json({ message: 'Not Found' });

    return res.status(200).json(data);
  }
}
