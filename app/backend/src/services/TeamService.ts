import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(private newTeamModel = new TeamModel()) { }

  getAll = async () => this.newTeamModel.getAll();

  getById = async (id: number) => this.newTeamModel.getById(id);
}
