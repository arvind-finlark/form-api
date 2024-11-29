const mongoose = require("mongoose");

const options = {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
};

const connectDB = (uri) => {
  console.log("connect db");

  return mongoose.connect(uri, options);
};

module.exports = connectDB;
