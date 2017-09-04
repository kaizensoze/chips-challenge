const Koa = require('koa');
const Router = require('koa-router');
const View = requirie('koa-views');

const app = new Koa();
const router = new Router();
const view = new View();

router.get('/', (ctx, next) => {
  ctx.body = 'Hello Koa';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
