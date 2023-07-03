import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import modelTeam from './TeamsModel';
// import OtherModel from './OtherModel';

class modelMatches extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

modelMatches.init({
  id: {
    allowNull: true,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeamId: {
    allowNull: true,
    field: 'home_Team_id',
    type: INTEGER,
  },
  homeTeamGoals: {
    allowNull: false,
    field: 'home_Team_Goals',
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: true,
    field: 'away_team_id',
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    field: 'away_team_goals',
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    field: 'in_progress',
    type: BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

modelMatches.belongsTo(modelTeam, { foreignKey: 'homeTeamId', as: 'homeTeam' });
modelMatches.belongsTo(modelTeam, { foreignKey: 'awayTeamId', as: 'awayTeam' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default modelMatches;
