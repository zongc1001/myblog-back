const router = require("@koa/router")();
const { Articles, Comments } = require("../model");

let getComments = async function (ctx, next) {
    let result = await Comments.find();
    if (result.length) {
        ctx.body = {
            status: 1,
            msg: "success",
            body: result,
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "no comments",
            body: [],
        };
    }
};

let postComment = async function (ctx, next) {
    let body = ctx.request.body;
    let articleId = ctx.params.articleId;
    let { username, userid, title, content } = body;
    let article = await Articles.findOne({ _id: articleId });
    if (!article) {
        ctx.status = 400;
        ctx.body = {
            status: 0,
            msg: "article not exist",
        };
        return;
    }
    let newComment = new Comments({
        username,
        userid,
        title,
        content,
        articleId,
    });
    let result = await newComment.save();
    if (result) {
        ctx.body = {
            status: 1,
            msg: "success",
            data: {
                id: result.id
            },
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "add comment error",
        };
    }
};

let getCommentsByArticleId = async function (ctx, next) {
    let articleId = ctx.params.articleId;
    let result = await Comments.find({ articleId: articleId });
    if(result.length) {
        ctx.body = {
            status: 1,
            msg: "success",
            body: result,
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "no commments",
            body: [],
        };
    }
};


let getCommentById = async function (ctx, next) {
    let id = ctx.params.id;
    let result = await Comments.findOne({ _id: id });
    if (result) {
        ctx.body = {
            status: 1,
            msg: "success",
            body: result,
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "comment not exist",
            body: {},
        };
    }
};

let putCommentById = async function (ctx, next) {
    let id = ctx.params.id;
    let body = {};
    if (ctx.request.body.title !== undefined) {
        body.title = ctx.request.body.title;
    }
    if (ctx.request.body.content !== undefined) {
        body.content = ctx.request.body.content;
    }

    let result = await Comments.updateOne(
        {
            _id: id,
        },
        {
            $set: body,
        }
    );

    if (result) {
        ctx.body = {
            status: 1,
            msg: "success",
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "update error",
        };
    }


};

let delCommentById = async function (ctx, next) {
    let id = ctx.params.id;
    let result = await Comments.deleteOne({ _id: id });
    if (result) {
        ctx.body = {
            status: 1,
            msg: "success",
        };
    } else {
        ctx.body = {
            status: 0,
            msg: "delete error",
        };
    }
};


router.prefix("/comments");

router.get("/", getComments);
router.get("/articles/:articleId", getCommentsByArticleId);
router.get("/:id", getCommentById);

router.post("/:articleId", postComment);

router.put("/:id", putCommentById);

router.delete("/:id", delCommentById);

module.exports = router;
