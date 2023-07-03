import { ModelStatic } from 'sequelize';
import IMatchesService from '../interfaces/IMatchesService';
import IMatches from '../interfaces/IMatches';
import modelMatches from '../database/models/MatchesModel';
import modelTeam from '../database/models/TeamsModel';
import IMatchesCreate from '../interfaces/IMatchesCreate';

export default class MatchesService implements IMatchesService {
  protected model: ModelStatic<modelMatches> = modelMatches;

  public async getMatches(): Promise<IMatches[]> {
    const data = await this.model.findAll({
      include:
      [
        { model: modelTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: modelTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  public async getInProgress(inProgress: boolean): Promise<IMatches[]> {
    const data = await this.model.findAll({ where: { inProgress },
      include:
      [
        { model: modelTeam, as: 'homeTeam', attributes: ['teamName'] },
        { model: modelTeam, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return data;
  }

  public async finish(id: number): Promise<number> {
    const [data] = await this.model.update(
      { inProgress: false },
      { where: { id } },
    );
    return data;
  }

  public async updateById(id: number, body: IMatchesCreate)
    : Promise<number> {
    const [data] = await this.model.update(
      { homeTeamGoals: body.homeTeamGoals, awayTeamGoals: body.awayTeamGoals },
      { where: { id } },
    );

    return data;
  }

  public async create(body: IMatchesCreate)
    : Promise<modelMatches> {
    const data = await this.model.create(
      {
        homeTeamId: body.homeTeamId,
        homeTeamGoals: body.homeTeamGoals,
        awayTeamId: body.awayTeamId,
        awayTeamGoals: body.awayTeamGoals,
        inProgress: true,
      },
    );

    return data;
  }
}
