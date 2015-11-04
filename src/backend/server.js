const path = require('path');

const co = require('co');
const Koa = require('koa');
const argv = require('yargs').argv;

function setupServer(isProduction) {
    co(function* () {
        const app = Koa();

        const fileServe = require('koa-static');
        app.use(fileServe(path.resolve('./dist'), {defer: true}));
        app.use(fileServe(path.resolve('./static'), {defer: true}));


        if(argv.bundle) {
            yield new Promise(resolve=> {
                console.log(`rebuilding frontend from startup, may take a few seconds.`);
                if (isProduction) {
                    console.log(`PRODUCTION MODE: OPTIMIZING THE GIBSON`);
                }
                else {
                    console.log(`DEVELOPMENT MODE: Enabling livereactload and watchify`);
                }

                const start = new Date();
                const fs = require('fs');
                const browserify = require('browserify');
                const watchify = require('watchify');
                const babelify = require('babelify');
                const uglifyify = require('uglifyify');
                const envify = require('envify');


                const livereactload = require('livereactload');

                const transform = [[babelify, {}], [envify, {}]];
                if (isProduction) transform.push([uglifyify, {global: true}]);

                const args = Object.assign({
                    debug: !isProduction,
                    transform,
                    plugin: isProduction ? [] : [livereactload, watchify],
                    cache: {},
                    packageCache: {},
                    fullPaths: !isProduction
                });

                const b = browserify('src/frontend/clientEntryPoint.js', args);
                b.on('update', bundle);
                bundle();

                function bundle() {
                    const fileWriteStream = fs.createWriteStream('dist/bundle.js');
                    fileWriteStream.on('finish', ()=> {
                        const end = new Date()
                        const diff = ((end - start) / 1000).toFixed(3);
                        console.log(`New frontend bundle built. Took ${diff} seconds.`);
                        resolve(true);
                    });
                    b.bundle().pipe(fileWriteStream);
                }
            });
        }

        const Router = require('koa-router');
        const router = Router();
        app.use(router.routes());
        app.use(router.allowedMethods());

        app.listen(3000, ()=> {
            console.log(`Running Koa.js with Livereactload!`);
        });
    })
}

setupServer(process.env.NODE_ENV === 'production');