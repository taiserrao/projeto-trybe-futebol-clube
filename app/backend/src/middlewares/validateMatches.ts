import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class ValidateMatch {
  public static async matchesVerification(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;

    const teamsService = new TeamService();

    if (homeTeamId === awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const teams = [homeTeamId, awayTeamId];
    const validTeams = await Promise.all(teams.map((teamId) => teamsService.getById(teamId)));

    if (validTeams.includes(null)) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}
