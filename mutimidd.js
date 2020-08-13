const compose = require("koa-compose");

async function random(ctx, next) {
    if("/random" == ctx.path) {
        ctx.body = Math.floor(Math.random() * 10);
    } else {
        await next();
    }
}

