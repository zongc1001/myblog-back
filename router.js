const router = require("@koa/router")();
const articles = require("./routes/articles");
const comments = require("./routes/comments");
const users = require("./routes/users");
const uploads = require("./routes/uploads");

router.prefix("/api");
router.use(articles.routes(), articles.allowedMethods());
router.use(comments.routes(), comments.allowedMethods());
router.use(users.routes(), users.allowedMethods());
router.use(uploads.routes(), uploads.allowedMethods());

module.exports = router;
