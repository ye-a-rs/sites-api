const path = require('path');
const { fork } = require('child_process');
const request = require('supertest');
const expect = require('chai').expect;

const loginSuccess = (res) => {
  expect(res.status, '断言“http”为200').to.be.equal(200);
  {
    expect(res.body.code, '断言“code”不为空').to.not.be.undefined;
    expect(res.body.code, '断言“code”不为空').to.not.be.null
    expect(res.body.code, '断言“code”为“0”').to.be.equal(0);
  }
  {
    expect(res.body.data, '断言“data”不为空').to.not.be.undefined;
    expect(res.body.data, '断言“data”不为空').to.not.be.null
    {
      expect(res.body.data.token, '断言“data”不为空').to.not.be.undefined;
      expect(res.body.data.token, '断言“data”不为空').to.not.be.null;
    }
    {
      expect(res.body.data.user, '断言用户信息不为空').to.not.be.undefined;
      expect(res.body.data.user, '断言用户信息不为空').to.not.be.null;
      {
        expect(res.body.data.user.nickname, '断言用户昵称不为空').to.not.be.undefined;
        expect(res.body.data.user.nickname, '断言用户头像不为空').to.not.be.null;
        expect(res.body.data.user.avator, '断言用户昵称不为空').to.not.be.undefined;
        expect(res.body.data.user.avator, '断言用户头像不为空').to.not.be.null;
      }
    }
  }
}

const process = {};
describe('测试登录接口', () => {
  before((done) => {
    process.app = fork(path.join(__dirname, '../src/index'));
    process.mock = fork(path.join(__dirname, '../mock/index'));
    setTimeout(() => {
      done();
    }, 3000);
  });
  after((done) => {
    process.app.kill();
    process.mock.kill();
    done();
  });
  it('使用手机号码登录成功', (done) => {
    request('http://127.0.0.1:3000')
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        user: '18682000065',
        password: '123456'
      })
      .end((err, res) => {
        loginSuccess(res);
        done();
      });
  });
  it('使用用户帐号登录成功', (done) => {
    request('http://127.0.0.1:3000')
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        user: 'wangkuan',
        password: '123456'
      })
      .end((err, res) => {
        loginSuccess(res);
        done();
      });
  });
  it('使用邮箱登录成功', (done) => {
    request('http://127.0.0.1:3000')
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        user: 'louis.wang@live.com',
        password: '123456'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body.code).to.not.be.undefined;
        expect(res.body.code).to.not.be.null
        expect(res.body.code).to.be.equal(0);
        expect(res.body.data).to.not.be.undefined;
        expect(res.body.data).to.not.be.null
        expect(res.body.data.token).to.not.be.undefined;
        expect(res.body.data.token).to.not.be.null;
        done();
      });
  });
  it('使用手机号码登录不成功', (done) => {
    request('http://127.0.0.1:3000')
      .post('/api/user/login')
      .set('Content-Type', 'application/json')
      .send({
        user: '18682000065',
        password: '654321'
      })
      .end((err, res) => {
        expect(res.status, '断言“http”为200').to.be.equal(200);
        expect(res.body.code).to.not.be.undefined;
        expect(res.body.code).to.not.be.null
        expect(res.body.code).to.be.equal(1);
        done();
      });
  });
});