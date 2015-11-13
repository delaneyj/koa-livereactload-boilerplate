const Router = require('koa-router');
const redis = require('ioredis')();
const uuid = require('node-uuid');

function setupUserRoutes(){
  const userRouter= new Router();

  userRouter.get('/',function*(){
    const users = yield redis.smembers('users');
    this.body = { users};
  });

  userRouter.get('/:userId',function*(){
    const userId = this.params.userId;
    const userData = yield redis.hgetall(`users:${userId}`);
    this.body = { userData};
  });

  userRouter.post('/register',function*(){
    const userId = uuid.v4();
     const {name,age} = this.request.body;
    const userKey = `users:${userId}`;
    yield redis.hmset(userKey,{userId,name,age});
    yield redis.sadd(`users`, userId);
    this.body ={userId};
  })
  return userRouter;
}

module.exports= setupUserRoutes;
