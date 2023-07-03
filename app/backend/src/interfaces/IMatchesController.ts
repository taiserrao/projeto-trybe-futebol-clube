import { Request, Response } from 'express';
import IMatches from './IMatches';
import modelMatches from '../database/models/MatchesModel';

export default interface IMatchesController {
  getMatches(req: Request, res: Response): Promise<Response<IMatches[]>>,
  finish(req: Request, res: Response): Promise<Response<{ message: string }>>,
  create(req: Request, res: Response): Promise<Response<modelMatches>>,
}
