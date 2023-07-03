import modelMatches from '../database/models/MatchesModel';

export default interface IMatches {
  id?: modelMatches['id'];
  homeTeamId: modelMatches['homeTeamId'];
  homeTeamGoals: modelMatches['homeTeamGoals'];
  awayTeamId: modelMatches['awayTeamId'];
  awayTeamGoals: modelMatches['awayTeamGoals'];
  inProgress: modelMatches['inProgress'];
  homeTeam?: {
    teamName: string,
  };
  awayTeam?: {
    teamName: string,
  };
}
