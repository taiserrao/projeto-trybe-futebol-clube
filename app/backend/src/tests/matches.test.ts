import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import modelMatches from '../database/models/MatchesModel';
import { matchesMock, matches } from './mocks/matches.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;
describe('Testa a model Matches', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Find All', async () => {
    sinon.stub(modelMatches, 'findAll').resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
    expect(chaiHttpResponse.status).to.be.deep.equal(200);

  });

  it('Find One', async () => {
    sinon.stub(modelMatches, 'findOne').resolves(matchesMock[0] as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body[0]).to.be.deep.equal(matches[0]);
    expect(chaiHttpResponse.status).to.be.equal(200);

  });

 
  it('finish match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(modelMatches, 'update').resolves({ ...matches[1], update: sinon.stub() } as any);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('Authorization', login.body.token);
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.status).to.be.equal(404);

  });

  it('create match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(modelMatches, 'create').resolves({
      homeTeamId: 5,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    }).set('Authorization', login.body.token);
    expect(chaiHttpResponse.status).to.be.equal(201);

  });

  it('token invalid', async () => {

    sinon.stub(modelMatches, 'create').resolves({
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    });
    console.log(chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });

  });

  it('create invalid match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(modelMatches, 'create').resolves({
      homeTeamId: 2,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 2,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    }).set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });

  });

});
