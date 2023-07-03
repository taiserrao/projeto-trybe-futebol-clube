import modelMatches from '../database/models/MatchesModel';

export default interface IMatchesCreate {
  homeTeamId?: modelMatches['homeTeamId'];
  awayTeamId?: modelMatches['awayTeamId'];
  homeTeamGoals: modelMatches['homeTeamGoals'];
  awayTeamGoals: modelMatches['awayTeamGoals'];
}
