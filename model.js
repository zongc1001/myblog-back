let db = require("./db");

let Schema = db.Schema;

let UserSchema = new Schema(
    {
        username: String,
        nickname: String,
        password: String,
    },
    { timestamps: true }
);

let ArticleSchema = new Schema(
    {
        userid: String,
        username: String,
        title: String,
        content: String,
    },
    {
        timestamps: true,
    }
);

let CommentSchema = new Schema(
    {
        userid: String,
        username: String,
        title: String,
        content: String,
        articleId: String,
    },
    { timestamps: true }
);


let Users = db.model("User", UserSchema);
let Articles = db.model("Article", ArticleSchema);
let Comments = db.model("Comment", CommentSchema);
module.exports = { Users, Articles, Comments };