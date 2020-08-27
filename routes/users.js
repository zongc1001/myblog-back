const router = require("@koa/router")();
const jwt = require("jsonwebtoken");
const { Users } = require("../model");
const { secret } = require("../secret");

let login = async function (ctx, next) {
    let { username, password } = ctx.request.body;
    console.log(ctx.request.body);
	let result = await Users.findOne({ username, password });
	
    if (result) {
        let token = jwt.sign(
            {
                userid: result.id,
                username: username, //payload 部分可解密获取，不能放敏感信息
            },
            secret.jwtsecret,
            {
				expiresIn: secret.expiresIn,				
			}
        );
        ctx.body = {
            msg: "success",
            status: 1,
            token,
        };
    } else {
        ctx.status = 401;
        ctx.body = {
            msg: "login error",
            status: 0,
            token: null,
        };
    }
};

let signup = async function (ctx, next) {
    let { username, password, nickname } = ctx.request.body;
    let result = await Users.findOne({ username });
    if (result) {
        ctx.status = 401;
        ctx.body = {
			msg: "username exist",
            status: 0,
        };
        return;
    }
    var user = new Users({
        username,
        password,
        nickname,
    });
    console.log(user);
    await user.save();
    ctx.body = {
        msg: "success",
        status: 1,
    };
};

router.prefix("/users");
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;

