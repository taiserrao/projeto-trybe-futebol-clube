import ITeamsInformations from './ITeamsInformations';

export default interface ILeaderBoardService {
  getHome(): Promise<ITeamsInformations[]>;
}
