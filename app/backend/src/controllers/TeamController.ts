import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private newTeamService = new TeamService()) { }
  getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.newTeamService.getAll();
    res.status(200).json(allTeams);
  };

  getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const idTeams = await this.newTeamService.getById(Number(id));
    res.status(200).json(idTeams);
  };
}
