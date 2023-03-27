const mongoose = require("mongoose");

const connection = mongoose.connect(
    "mongodb+srv://manshi:manshi@cluster0.fmrxdgb.mongodb.net/post?retryWrites=true&w=majority"
);

module.exports = {
  connection,
};