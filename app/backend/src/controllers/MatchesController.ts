import { Request, Response } from 'express';
import IMatchesController from '../interfaces/IMatchesController';
import IMatchesService from '../interfaces/IMatchesService';

export default class MatchesController implements IMatchesController {
  constructor(private _matchesService: IMatchesService) {}

  public async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress) {
      const data = await this._matchesService.getInProgress(inProgress === 'true');
      return res.status(200).json(data);
    }

    const data = await this._matchesService.getMatches();
    return res.status(200).json(data);
  }

  public async finish(req: Request, res: Response) {
    const { id } = req.params;
    const data = await this._matchesService.finish(Number(id));

    if (data > 0) {
      return res.status(200).json({ message: 'Finished' });
    }

    return res.status(404).json({ message: 'Not Found' });
  }

  public async updateById(req: Request, res: Response) {
    const { id } = req.params;
    const { body } = req;

    const data = await this._matchesService.updateById(Number(id), body);

    if (data > 0) {
      return res.status(200).json({ message: 'Match Updated' });
    }
    return res.status(404).json({ message: 'Not Found' });
  }

  public async create(req: Request, res: Response) {
    const { body } = req;

    const data = await this._matchesService.create(body);

    return res.status(201).json(data);
  }
}
