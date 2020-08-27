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