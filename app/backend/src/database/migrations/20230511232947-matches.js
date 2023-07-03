'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        allowNull: true,
        field: 'home_Team_id',
        references: {
          key: 'id',
          model: 'teams',
        },
        type: Sequelize.INTEGER
      },
      homeTeamGoals: {
        allowNull: false,
        field: 'home_Team_Goals',
        type: Sequelize.INTEGER
      },
      awayTeamId: {
        allowNull: true,
        field: 'away_team_id',
        references: {
          key: 'id',
          model: 'teams',
        },
        type: Sequelize.INTEGER
      },
      awayTeamGoals: {
        allowNull: false,
        field: 'away_team_goals',
        type: Sequelize.INTEGER
      },
      inProgress: {
        allowNull: false,
        field: 'in_progress',
        type: Sequelize.BOOLEAN
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
