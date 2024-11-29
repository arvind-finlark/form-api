require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const forms_route = require("./routes/forms");
const connectDB = require("./db/connect");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_ENDPOINT_NOT_FOUND_ERR, SERVER_ERR } = require("./errors");

app.get("/", (req, res) => {
  res.send("Hi, i am live!");
});

//middleware or to set router
app.use(bodyParser.json());
app.use("/api/forms", forms_route);

// page not found error handling  middleware

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from your React app
//     methods: "GET,POST,PUT,DELETE,OPTIONS",
//     allowedHeaders: ["Content-Type", "application/json"], // Add Content-Type here
//   })
// );

app.use("*", (req, res, next) => {
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND_ERR,
  };
  next(error);
});
app.use(cors());

// global error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  const status = err.status || 500;
  const message = err.message || SERVER_ERR;
  const data = err.data || null;
  res.status(status).json({
    type: "error",
    message,
    data,
  });
});

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`${PORT} Yes i am connected`);
    });
  } catch (error) {
    console.log("error = ", error);
  }
};

start();
