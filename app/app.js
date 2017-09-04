const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const serve = require('koa-static');

const app = new Koa();
const router = new Router();

app.use(serve('.'));
app.use(serve('data/levels'));

router.get('/', async (ctx, next) => {
  await send(ctx, '/views/game.html');
});

router.get('/game', async (ctx, next) => {
  await send(ctx, '/views/game.html');
});

router.get('/editor', async (ctx, next) => {
  await send(ctx, '/views/editor.html');
});

router.get('/levels/:id', async (ctx, next) => {
  await send(ctx, `/data/levels/${ctx.params.id}.json`);
});

router.get('/blah', function (ctx, next) {
  ctx.body = 'blah';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// handle any unanticipated path
app.use(async (ctx) => {
  ctx.body = 'Not found.';
});

app.listen(3000);
