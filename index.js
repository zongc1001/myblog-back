const Koa = require("koa");
const app = new Koa();
const bodyparser = require("koa-bodyparser");
const jwt = require("koa-jwt");
const router = require("./router");
const { secret } = require("./secret");
const port = 8082;
const logger = require("koa-logger");
const static = require("koa-static");

app.use(logger());

// app.use(async (ctx, next) => {
//   ctx.set("Access-Control-Allow-Origin", "*");
//   ctx.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PATCH, HEAD, PUT, DELETE");
//   ctx.set("Access-Control-Max-Age", "3600");
//   ctx.set("Access-Control-Allow-Headers", "x-requested-with,Authorization,Content-Type,Accept");
//   ctx.set("Access-Control-Allow-Credentials", "true");
//   if (ctx.request.method == "OPTIONS") {
//     ctx.response.status = 200;
//   } else {
//     try {
//       await next();
//     } catch (err) {
//       console.log("handler处理错误" + err.message);
//       ctx.response.status = err.statusCode || err.status || 500;
//       ctx.response.body = {
//         message: err.message
//       };
//     }
//   }
// });

app.use(bodyparser());
app.use(static(__dirname + "/public"));
app.use(
    jwt({
        secret: secret.jwtsecret
    }).unless({
        method: ["OPTIONS", "GET"],
        path: [/^\/api\/users\/login/, /^\/api\/users\/signup/]
    })
);
app.use(router.routes(), router.allowedMethods());
app.listen(port);
console.log(`Server running at http://127.0.0.1:${port}/`);