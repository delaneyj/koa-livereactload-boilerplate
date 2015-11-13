const Router = require('koa-router');

function setupApiRoutes(){
  const apiRouter= new Router();
  apiRouter.get('/',function*(){
    this.body = {
      sucess:true,
      message:'fooX'
    }
  });

  const subroute=require('./users')();
  apiRouter.use('/users',subroute.routes(),subroute.allowedMethods());

  return apiRouter;
}

module.exports= setupApiRoutes;
