const router = require("@koa/router")();
const multer = require("@koa/multer");

router.prefix("/uploads");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "public/");
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + "-" + Date.now() + file.originalname);
	},
});
const upload = multer({ storage: storage });

router.post("/image", upload.single("file"), function (ctx, next) {
	let data = {
		path: ctx.request.file.path,
		filename: ctx.request.file.filename,
		contentType: ctx.request.file.mimetype,
	};

	ctx.body = {
		status: 1,
		msg: "uploads success",
		data: data,
	};
});

module.exports = router;