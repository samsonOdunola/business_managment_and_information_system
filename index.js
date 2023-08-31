const express = require("express");
const App = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const config = require("./config");
const adminRouter = require("./Admin/admin.routes");
const staffRouter = require("./Staff/staff.routes");
const departmentRouter = require("./Departments/department.routes");
const { adminAuth, teamLeadAuth } = require("./middleware/auth");

const port = config.port;
const mongoUrl = config.databaseUrl;

const options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  minPoolSize: 5,
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

App.use(express.urlencoded({ extended: false }));
App.use(express.json({ limit: "50mb" }));
App.use(cors());
App.use("/api/admin", adminAuth, adminRouter);
App.use("/api/staff", staffRouter);
App.use("/api/department", teamLeadAuth, departmentRouter);

App.get("/", (req, res) => {
  res.send("Working");
});

mongoose.connect(mongoUrl, options);
db = mongoose.connection;
db.on("error", (err) => {
  console.error("Error connecting to database.", err);
});
db.once("connected", () => {
  console.log("Database Connection is Successful");
  App.listen(port, () => {
    console.log("Server is running on port " + port);
  });
});
db.once("disconnected", () => {
  console.info("Database Disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close((err) => {
    console.info("Database Connection Closed Due to App Termination");
    process.exit(err ? 1 : 0);
  });
});
