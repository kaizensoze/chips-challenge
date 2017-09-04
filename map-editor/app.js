const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(serve('.'));
app.use(serve('../data/levels'));

router.get('/blah', function (ctx, next) {
  ctx.body = 'blah';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// default route
app.use(async (ctx) => {
  await send(ctx, __dirname + '/index.html');
});

app.listen(3000);
