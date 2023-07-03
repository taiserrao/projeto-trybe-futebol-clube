import modelTeam from '../database/models/TeamsModel';

export default class TeamModel {
  constructor(private _db = modelTeam) { }

  getAll = async () => this._db.findAll();

  getById = async (id: number) => this._db.findByPk(id);
}
