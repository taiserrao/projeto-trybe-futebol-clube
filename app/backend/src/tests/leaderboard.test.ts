import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import modelUsers from '../database/models/UsersModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const secret = process.env.JWT_SECRET;
const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};


describe('Testa a model modelUsers', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('get leaderboard', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('get leaderboard home', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('get leaderboard away', async () => {
    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
  });
});