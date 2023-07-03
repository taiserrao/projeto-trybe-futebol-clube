import IMatches from './IMatches';
import modelMatches from '../database/models/MatchesModel';
import IMatchesCreate from './IMatchesCreate';

export default interface IMatchesService {
  getMatches(): Promise<IMatches[]>;
  getInProgress(inProgress: boolean): Promise<IMatches[]>;
  finish(id: number): Promise<number>;
  updateById(id: number, body: { homeTeamGoals: number, awayTeamGoals: number }): Promise<number>;
  create(body: IMatchesCreate): Promise<modelMatches>;
}
