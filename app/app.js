const Koa = require('koa');
const Router = require('koa-router');
const send = require('koa-send');
const serve = require('koa-static');

const path = require('path');
const fs = require('fs-promise');

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

router.get('/levels', async (ctx, next) => {
  const paths = await fs.readdir('data/levels');
  const pathMap = new Map();
  for (var _path of paths) {
    pathMap.set(path.basename(_path, '.json'), _path);
  }
  const pathMapJSON = JSON.stringify(...pathMap);

  ctx.type = 'application/json';
  ctx.body = pathMapJSON;
});

router.get('/levels/:id', async (ctx, next) => {
  ctx.type = 'application/json';
  await send(ctx, `/data/levels/${ctx.params.id}.json`);
});

router.get('/blah', async (ctx, next) => {
  ctx.body = 'blah';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

// handle any unanticipated path
app.use(async (ctx, next) => {
  ctx.body = 'Not found.';
});

app.listen(3000);
