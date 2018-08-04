const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const config = require('./config');
const userService = require('./services/passport/userService');

const app = new Koa();
const router = new Router();

const loginStatus = {
  success: 0,
  fail: 1
}

router.post('/api/user/login', async (ctx) => {
  const user = ctx.request.body.user;
  const password = ctx.request.body.password;
  if (user === undefined || password === undefined) {
    return ctx.status = 400;
  }
  let loginResult;
  try {
    if (/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(user)) {
      loginResult = await userService.loginByPhone(user, password);
    } else if (/^[\.a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(user)) {
      loginResult = await userService.loginByEmail(user, password);
    } else {
      loginResult = await userService.loginByUsername(user, password)
    }
  } catch (err) {
    return ctx.status = 500;
  }
  if (loginResult) {
    const getInfoResult = await userService.getInfo(loginResult.token);
    if (getInfoResult) {
      ctx.body = {
        code: loginStatus.success,
        data: {
          token: loginResult.token,
          user: {
            nickname: getInfoResult.nickname,
            avator: getInfoResult.avator
          }
        }
      }
    } else {
      return ctx.status = 500;
    }
  } else {
    ctx.body = {
      code: loginStatus.fail
    }
  }
});

app.use(bodyParser());
app.use(router.routes());
app.listen(config.port, () => {
  console.log('Server listening on', config.port)
});