const path = require('path');

const co = require('co');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

function setupServer(isProduction) {
    co(function* () {
      try{
        const app = Koa();
        app.use(bodyParser());

        const fileServe = require('koa-static');
        app.use(fileServe(path.resolve('./dist'), {defer: true}));
        app.use(fileServe(path.resolve('./static'), {defer: true}));



        const mainRouter = new Router();

        const apiRouter = require('./api')();
        mainRouter.use('/api', apiRouter.routes(), apiRouter.allowedMethods());

        app.use(mainRouter.routes());
        app.use(mainRouter.allowedMethods());

        app.listen(3000, ()=> {
            console.log(`Running Koa.js with Livereactload!`);
        });
      }
      catch(e){
        console.error(e);
      }
    })
}

setupServer(process.env.NODE_ENV === 'production');
