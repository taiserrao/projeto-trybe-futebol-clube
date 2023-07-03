import { ModelStatic } from 'sequelize';
import modelTeam from '../database/models/TeamsModel';
import modelMatches from '../database/models/MatchesModel';
import IMatches from '../interfaces/IMatches';
import ITeam from '../interfaces/ITeam';
import ITeamsInformations from '../interfaces/ITeamsInformations';
import ILeaderBoard from '../interfaces/ILeaderBoard';
import ILeaderBoardService from '../interfaces/ILearderBoardService';
import IResults from '../interfaces/IResults';

export default class LeaderBoardService implements ILeaderBoardService {
  private modelTeam: ModelStatic<modelTeam> = modelTeam;
  private modelMatch: ModelStatic<modelMatches> = modelMatches;

  private async getTeams(): Promise<modelTeam[]> {
    const result = await this.modelTeam.findAll();
    return result;
  }

  private async getMatches(): Promise <modelMatches[]> {
    const result = await this.modelMatch.findAll({ where: { inProgress: false } });
    return result;
  }

  private static getMatchResults(teamOne: number, teamTwo: number): IResults {
    const matchResult = {
      totalPoints: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    if (teamOne > teamTwo) {
      matchResult.totalPoints += 3;
      matchResult.totalVictories += 1;
    } else if (teamOne === teamTwo) {
      matchResult.totalPoints += 1;
      matchResult.totalDraws += 1;
    } else {
      matchResult.totalLosses += 1;
    }
    return matchResult;
  }

  private static homeTeamInfo(team: ITeam, matches: IMatches[]): ITeamsInformations {
    const teamResult = new ITeamsInformations(team.teamName);

    const homeMatches = matches.filter((match) => match.homeTeamId === team.id);
    teamResult.totalGames = homeMatches.length;

    homeMatches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
      const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
        .getMatchResults(homeTeamGoals, awayTeamGoals);

      teamResult.totalPoints += totalPoints;
      teamResult.totalVictories += totalVictories;
      teamResult.totalDraws += totalDraws;
      teamResult.totalLosses += totalLosses;
      teamResult.goalsFavor += homeTeamGoals;
      teamResult.goalsOwn += awayTeamGoals;

      const { goalsFavor, goalsOwn, totalGames, totalPoints: TP } = teamResult;

      teamResult.goalsBalance = goalsFavor - goalsOwn;
      teamResult.efficiency = +(((TP / (totalGames * 3))) * 100).toFixed(2);
    });
    return teamResult;
  }

  private static awayInfo(team: ITeam, matches: IMatches[]): ITeamsInformations {
    const teamResult = new ITeamsInformations(team.teamName);

    const awayMatches = matches.filter((match) => match.awayTeamId === team.id);
    teamResult.totalGames = awayMatches.length;

    awayMatches.forEach(({ awayTeamGoals, homeTeamGoals }) => {
      const { totalPoints, totalVictories, totalDraws, totalLosses } = LeaderBoardService
        .getMatchResults(awayTeamGoals, homeTeamGoals);

      teamResult.totalPoints += totalPoints;
      teamResult.totalVictories += totalVictories;
      teamResult.totalDraws += totalDraws;
      teamResult.totalLosses += totalLosses;
      teamResult.goalsFavor += awayTeamGoals;
      teamResult.goalsOwn += homeTeamGoals;

      const { goalsFavor, goalsOwn, totalGames, totalPoints: TP } = teamResult;
      teamResult.goalsBalance = goalsFavor - goalsOwn;
      teamResult.efficiency = +(((TP / (totalGames * 3))) * 100).toFixed(2);
    });
    return teamResult;
  }

  public static sortTeam(team: ILeaderBoard[]) {
    const sortTeams = team.sort((team1, team2) => {
      if (team1.totalPoints !== team2.totalPoints) {
        return team2.totalPoints - team1.totalPoints;
      }
      if (team1.totalVictories !== team2.totalVictories) {
        return team2.totalVictories - team1.totalVictories;
      }
      if (team1.goalsBalance !== team2.goalsBalance) {
        return team2.goalsBalance - team1.goalsBalance;
      }
      return team2.goalsFavor - team1.goalsFavor;
    });
    return sortTeams;
  }

  public async getAway() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const awayTeam = teams.map((team) => LeaderBoardService.awayInfo(team, matches));
    const sort = LeaderBoardService.sortTeam(awayTeam);
    return sort;
  }

  public async getHome() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const teamMap = teams.map((team) => LeaderBoardService.homeTeamInfo(team, matches));

    const sort = LeaderBoardService.sortTeam(teamMap);
    return sort;
  }

  public async getAllTeams() {
    const teams = await this.getTeams();
    const matches = await this.getMatches();

    const allTeams = teams.map((team) => LeaderBoardService.awayInfo(team, matches));

    return allTeams;
  }
}
