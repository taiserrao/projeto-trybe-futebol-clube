import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import modelUsers from '../database/models/UsersModel';
import { loginValid } from './mocks/users.mock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a model Users', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(async () => {
    sinon.stub(modelUsers, 'findOne').withArgs({ where: { email: loginValid.email } }).resolves({dataValues: loginValid} as modelUsers);
  })

  it('post user', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
        email: loginValid.email,
        password: 'secret_admin',
    });
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.body).to.have.property('token');

  });

  it('post invalid', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
        email: loginValid.email,
        password: '5f689',
    });
    expect(chaiHttpResponse.body).to.not.have.property('token');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });

  });

});
