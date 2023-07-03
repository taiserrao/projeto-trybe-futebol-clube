import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import modelTeam from '../database/models/TeamsModel';
import { mockTeams , oneMockTeams } from './mocks/teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model Teams', () => {
  describe('TeamsModel', () => {
    let chaiHttpResponse: Response;

    beforeEach(() => {
      sinon.stub(modelTeam, 'findAll').resolves(mockTeams as unknown as modelTeam[]);
      sinon.stub(modelTeam, 'findByPk').resolves(oneMockTeams as unknown as modelTeam);
    });

    it('/teams', async () => {
      const { body, status } = await chai.request(app).get('/teams');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body).to.be.deep.equal(mockTeams);
    });

    it('/teams/1', async () => {
      const teamId = 9;
      chaiHttpResponse = await chai.request(app).get(`/teams/${teamId}`);
      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.be.deep.equal(oneMockTeams);
    });

  });
  afterEach(sinon.restore);
});
