const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();


const user = {
  username: 'wangkuan',
  phone: '18682000065',
  email: 'louis.wang@live.com',
  password: '123456',
}

router.post('/api/user/loginByPhone', (ctx) => {
  if (ctx.request.body.phone === user.phone && ctx.request.body.password === user.password) {
    ctx.body = {
      code: 0,
      data: {
        token: 'token'
      }
    }
  } else {
    ctx.body = {
      code: 1
    }
  }
});

router.post('/api/user/loginByEmail', (ctx) => {
  if (ctx.request.body.email === user.email && ctx.request.body.password === user.password) {
    ctx.body = {
      code: 0,
      data: {
        token: 'token'
      }
    }
  } else {
    ctx.body = {
      code: 1
    }
  }
});

router.post('/api/user/loginByUsername', (ctx) => {
  if (ctx.request.body.username === user.username && ctx.request.body.password === user.password) {
    ctx.body = {
      code: 0,
      data: {
        token: 'token'
      }
    }
  } else {
    ctx.body = {
      code: 1
    }
  }
});

router.post('/api/user/getInfo', (ctx) => {
  ctx.body = {
    code: 0,
    data: {
      avator: 'http://www.qq.com/avator.png',
      nickname: '会跳舞的老鼠',
      name: '谢锦辉',
      age: 18
    }
  }
});

app.use(bodyParser());
app.use(router.routes());
app.listen(3001, () => {
  console.log('Server listening on', 3001)
});