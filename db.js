let mongoose = require("mongoose");
let testDB = "mongodb://localhost:27017/blog";

mongoose.connect(
    testDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    function(err) {
        if(err) {
            console.log("MongoDB connect fail.");
        } else {
            console.log("MongoDB connect success.");
        }
    }
);

module.exports = mongoose;

